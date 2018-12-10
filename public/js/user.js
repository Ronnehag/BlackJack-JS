
class User {
    constructor() {
        this.score = 0;
        this.hand = new Array();
    }
    addCardToHand(card) {
        this.hand.push(card);
    }

    controlMoney(bet) {
        let playerMoney = parseInt($("#money").text());
        let newVal = playerMoney - bet;
        if (newVal < 0) {
            return false;
        } else {
            gameInterface.updateMoney(newVal);
            return true;
        }
    }

    hit(card) {
        if (this.hand.length === 5) return;
        this.addCardToHand(card);
        gameInterface.printCard($("#playerCards"), card);
        this.calculateNewScore();
        gameInterface.updateScore($("#playerScore"), this.score);
        if (this.score > 21) {
            return false;
        }
        return true;
    }

    // Loops the users hand, check for Aces. Counting them first as 11,
    // if score is greater than 21, count them as 1.
    calculateNewScore() {
        this.score = 0;
        let numberOfAces = 0;
        for (const card of this.hand) {
            if (card.value === 'A') {
                this.score += card.weight()[1];
                numberOfAces++;
            } else {
                this.score += card.weight();
            }
        }
        if (this.score > 21 && numberOfAces !== 0) {
            for (let i = 0; i < numberOfAces; i++) {
                this.score -= 10; // Count the ace as 1 instead, removing 10.
                if (this.score <= 21) {
                    break;
                }
            }
        }
    }
}




class Computer extends User {
    constructor() {
        super();
    }

    async drawCards(deck, playerScore, callback) {
        let counter = 0;
        let newCard;
        this.calculateNewScore();
        gameInterface.updateScore($("#houseScore"), this.score);
        if (this.score >= 17) { // If computer gets 17 or higher he has to stand.
            callback();
            return;
        } else {
            let timer = await setInterval(() => {
                newCard = deck.deal();
                gameInterface.printCard($("#houseCards"), newCard);
                this.addCardToHand(newCard);
                this.calculateNewScore();
                gameInterface.updateScore($("#houseScore"), this.score);
                counter++;
                if (this.npcShouldStand(playerScore) || counter === 3) {
                    clearInterval(timer);
                    callback();
                    return;
                }
            }, 1000);
        }
    }

    npcShouldStand(playerScore) {
        if (this.score >= 17 || this.score === 21 ||
            this.score > playerScore ||
            this.hand.length === 5 && this.score <= 21 || this.score > 21) {
            return true;
        } else return false;
    }
}