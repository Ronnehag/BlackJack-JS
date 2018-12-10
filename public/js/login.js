// Login authentication
$('#formLogin').on('submit', function (e) {
    e.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
        context: this,
        type: 'POST',
        url: '/game',
        data: formData,
        success(data) {
            this.submit();
        },
        error(jqXHR, ex) {
            if (jqXHR.status === 500) {
                $('#invalid').text('Invalid username and/or password.');
            }
        }
    });
});