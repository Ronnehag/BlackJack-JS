(function () {

    // MAIN GAME CONST
    const game = new BlackJack();

    // Disabled the game buttons
    $("#hit").attr("disabled", "disabled");
    $("#stay").attr("disabled", "disabled");
    $("#bet").attr("disabled", "disabled");
    $("#deal").attr("disabled", "disabled");
    $("#double").attr("disabled", "disabled");

    $("#deal").click((e) => {
        game.newGame();
        $(e.target).attr("disabled", "disabled");
        $("#double").attr("disabled", "disabled");
    });

    $("#hit").click(() => {
        const card = game.Deck.deal();
        $("#double").attr("disabled", "disabled");
        if (!game.Player.hit(card)) {
            $("#hit").attr("disabled", "disabled");
            $("#stay").attr("disabled", "disabled");
            game.lose();
        }
    });

    $("#stay").click(() => {
        $("#hit").attr("disabled", "disabled");
        $("#stay").attr("disabled", "disabled");
        gameInterface.showHiddenCard(game.Npc);
        game.Npc.drawCards(game.Deck, game.Player.score, () => {
            game.checkWhoWon();
        });
    });

    $("#five").click(() => {
        if (game.Player.controlMoney(5)) {
            gameInterface.addPot(5);
            $("#bet").removeAttr('disabled');
        } else {
            gameInterface.printMsg("Insufficient funds");
        }
    });

    // 10$ button
    $("#ten").click(() => {
        if (game.Player.controlMoney(10)) {
            gameInterface.addPot(10);
            $("#bet").removeAttr('disabled');
        } else {
            gameInterface.printMsg("Insufficient funds");
        }
    });

    // Bet button
    $("#bet").click((e) => {
        $(e.target).attr("disabled", "disabled");
        $("#five").attr("disabled", "disabled");
        $("#ten").attr("disabled", "disabled");
        $("#gameMsg").empty();
        $("#pot").text();
        $("#double").removeAttr("disabled");
        game.init(); // Starts the game
    });

    // Double button
    $("#double").click((e) => {
        let val = parseInt($("#pot").text());
        let newVal = (val * 2);
        if (game.Player.controlMoney(val)) {
            $("#pot").text(newVal);
            $(e.target).attr("disabled", "disabled");
            $("#hit").attr("disabled", "disabled");
            $("#stay").attr("disabled", "disabled");
            const card = game.Deck.deal();
            if (game.Player.hit(card)) {
                gameInterface.showHiddenCard(game.Npc);
                game.Npc.drawCards(game.Deck, game.Player.score, () => {
                    game.checkWhoWon();
                });
            } else {
                game.lose();
            }

        } else {
            gameInterface.printMsg("Insufficient funds");
        }
    });

    $(".dropdown-toggle").on('click', () => {
        $(".dropdown-menu").toggle();
    });
})();

