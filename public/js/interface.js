const gameInterface = (function () {

    function printScore(selector, score) {
        $(selector).html(score);
    }

    function printMessage(msg) {
        $("#gameMsg").text(msg);
    }

    function updateMoney(money) {
        $("#money").text(`${money}$`);
    }

    function addToPot(money) {
        let current = parseInt($("#pot").text()) || 0;
        $("#pot").text(`${current + money}`);
    }

    function resetInterface() {
        $("#houseCards img").remove();
        $("#playerCards img").remove();
        $("#five").removeAttr("disabled");
        $("#ten").removeAttr("disabled");
        $("#pot").empty();
        $("#playerScore").empty();
        $("#houseScore").empty();
        $("#gameMsg").text("Place your bet");
    }

    function printCardToDOM(selector, card) {
        let template = `<img src='./img/${card.toString()}.png' class='img-fluid card'>`;
        $(selector).prepend(template);
    }

    function printHiddenCardToDOM() {
        $("#houseCards").append(`<img src="./img/card-back-red.png" class="img-fluid card" id="card-back">`);
        $("#deal").attr("disabled", "disabled");
    }

    function showHiddenCardToDOM(npc) {
        $("#houseCards img").remove("#card-back");
        let template = `<img src='./img/${npc.hand[1].toString()}.png' class='img-fluid card'>`;
        $("#houseCards").append(template);
    }

    return {
        printCard: printCardToDOM,
        printHidden: printHiddenCardToDOM,
        updateScore: printScore,
        printMsg: printMessage,
        showHiddenCard: showHiddenCardToDOM,
        reset: resetInterface,
        updateMoney: updateMoney,
        addPot: addToPot
    }
})();

