$(function() {

    const btnLogin    = $('#btn-login');
    const btnLogout   = $('#btn-logout');
    const txtEmail    = $('#email');
    const txtPassword = $('#password');

    btnLogin.on('click', function() {
        const email = txtEmail.val();
        const password = txtPassword.val();

        // initiate ajax request
        $.ajax({
            url: 'app/index.php',
            method: 'POST',
            data: {
                login   : true,
                email   : email,
                password: password
            },
            success: (data) => {
                $('.output').html(data);
                $('.logged-in-user').show();
                $('.login-form').hide();
            },
            error: (error) => {
                alert(error.responseText);
            },
            complete: (response) => {

            }
        });
    });

    btnLogout.on('click', function() {
        if (confirm("Are you sure to logout?")) {
            // initiate ajax request to get logged in user
            $.ajax({
                url: 'app/index.php',
                method: 'POST',
                data: {
                    'logout': true
                },
                success: (data) => {
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                },
                complete: (response) => {

                }
            });
        }
    });
    
    // initiate ajax request to get logged in user
    $.ajax({
        url: 'app/index.php',
        method: 'GET',
        data: {
            'get_user': true
        },
        success: (data) => {
            $('.output').html(data);
            $('.logged-in-user').show();
            $('.login-form').hide();
        },
        error: (error) => {
            $('.login-form').show();
            $('.logged-in-user').hide();
            // alert(error.responseText);
        },
        complete: (response) => {

        }
    });
});