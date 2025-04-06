$(function() {

    const btnLogin = $('#btn-login');
    const txtEmail    = $('#email');
    const txtPassword = $('#password');

    btnLogin.on('click', function() {
        const email = txtEmail.val();
        const password = txtPassword.val();

        $('.output').html(
            '<p>' + email + '</p><p>' + password + '</p>'
        )

    });
});