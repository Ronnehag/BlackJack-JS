
class BlackJack {
    constructor() {
        this.Player = new User();
        this.Deck = new PlayingDeck();
        this.Npc = new Computer();
    }

    init() {
        for (let i = 0; i < 2; i++) {
            this.Player.addCardToHand(this.Deck.deal());
            this.Npc.addCardToHand(this.Deck.deal());
        }
        // Gets computers shown card, calculates it as 11 if it's an ace
        const computerShownCard = this.Npc.hand[0];
        if (computerShownCard.value === 'A') {
            this.Npc.score += computerShownCard.weight()[1];
        } else {
            this.Npc.score += computerShownCard.weight();
        }

        // Calculates the players first two cards, if both are ace they will be counted as 1 each.
        let counter = 0;
        this.Player.hand.forEach(card => {
            if (card.value === 'A') {
                counter++;
                if (counter !== 2) {
                    this.Player.score += card.weight()[1];
                } else {
                    this.Player.score += card.weight()[0];
                }
            } else {
                this.Player.score += card.weight();
            }
        });

        // Deals the first 4 cards, initDeal will print with a delay.
        this.initDeal(() => {
            $("#hit").removeAttr("disabled");
            $("#stay").removeAttr("disabled");
            $("#deal").attr("disabled", "disabled");
            gameInterface.updateScore($("#playerScore"), this.Player.score);
            gameInterface.updateScore($("#houseScore"), this.Npc.score);

            if (this.Player.score === 21) {
                this.win("BLACKJACK", 2);
                $("#hit").attr("disabled", "disabled");
                $("#stay").attr("disabled", "disabled");
                $("#double").attr("disabled", "disabled");
            } else {
                $("#gameMsg").text("Hit, stand or double?");
            }
        });
    }

    async initDeal(cb) {
        let count = 0;
        let timer = await setInterval(() => {
            switch (count) {
                case 0:
                    gameInterface.printCard($("#playerCards"), this.Player.hand[0]);
                    break;
                case 1:
                    gameInterface.printCard($("#houseCards"), this.Npc.hand[0]);
                    break;
                case 2:
                    gameInterface.printCard($("#playerCards"), this.Player.hand[1]);
                    break;
                case 3:
                    gameInterface.printHidden();
                    break;
            }
            count++;
            if (count === 4) {
                clearInterval(timer);
                cb();
            }
        }, 500);
    }

    newGame() {
        gameInterface.reset();
        this.Player.hand = new Array();
        this.Player.score = 0;
        this.Npc.hand = new Array();
        this.Npc.score = 0;
        this.Deck.resetDeck();
        this.Deck.shuffle();
    }

    lose() {
        const potMoney = parseInt($("#pot").text());
        gameInterface.printMsg(`HOUSE WIN | You lost ${potMoney}$`);
        $(document).trigger('lose', [(potMoney)]);
        $("#deal").removeAttr("disabled");
    }

    win(msg, val) {
        const potMoney = parseInt($("#pot").text());
        gameInterface.printMsg(`${msg} | Returned ${potMoney * val}$`);
        $(document).trigger('win', [(potMoney * val)]);
        $("#deal").removeAttr("disabled");
    }

    draw() {
        const potMoney = parseInt($("#pot").text());
        gameInterface.printMsg(`DRAW | Returned ${potMoney}$`);
        gameInterface.updateMoney(parseInt($('#money').text() + potMoney));
        $("#deal").removeAttr("disabled");
    }

    checkWhoWon() {
        if (this.Player.score === this.Npc.score) {
            this.draw();

        } else if ((this.Player.score <= 21 && this.Npc.score < this.Player.score) ||
            (this.Npc.score > 21) ||
            (this.Player.hand.length === 5 && this.Npc.score <= 21) &&
            (this.Player.score > this.Npc.score)) {

            this.win("YOU WIN", 2);

        } else if ((this.Npc.score <= 21 && this.Npc.score > this.Player.score) ||
            (this.Player.score > 21) ||
            (this.Npc.hand.length === 5 && this.Npc.score <= 21) &&
            (this.Npc.score > this.Player.score)) {

            this.lose();
        }
    }
}