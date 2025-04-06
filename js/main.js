$(function() {

    const btnLogin = $('#btn-login');
    const txtEmail    = $('#email');
    const txtPassword = $('#password');

    btnLogin.on('click', function() {
        const email = txtEmail.val();
        const password = txtPassword.val();

        // initiate ajax request
        $.ajax({
            url: 'app/login.php',
            method: 'POST',
            data: {
                login   : true,
                email   : email,
                password: password
            },
            success: (data) => {
                console.log(data);
            },
            error: (error) => {
                console.error(error);
            },
            complete: (response) => {
                console.log(response);
            }
        });



        // $('.output').html(
        //     '<p>' + email + '</p><p>' + password + '</p>'
        // )

    });
});