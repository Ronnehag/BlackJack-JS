(function () {

    // Handles loss
    $(document).on('lose', (e, val) => {
        const user = $('#userName').text();
        const data = {
            user: user,
            money: -val
        };
        $.ajax({
            type: 'PUT',
            url: '/game',
            data: data,
            success(data) {
                gameInterface.updateMoney(data.Money);
            }
        });
    });

    // Handles win
    $(document).on('win', (e, val) => {
        const user = $('#userName').text();
        const data = {
            user: user,
            money: val
        };
        $.ajax({
            type: 'PUT',
            url: '/game',
            data: data,
            success(data) {
                gameInterface.updateMoney(data.Money);
            }
        });
    });

    // Handles deposits
    $('form').on('submit', (e) => {
        e.preventDefault();
        $(".dropdown-menu").toggle();
        const value = $('form input').val();
        const user = $('#userName').text();
        const data = {
            user: user,
            money: value
        };
        $.ajax({
            type: 'PUT',
            url: '/game',
            data: data,
            success(data) {
                gameInterface.updateMoney(data.Money);
            }
        });
        return false;
    });

}());