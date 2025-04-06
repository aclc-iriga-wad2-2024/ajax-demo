$(function() {
    // cache html elements
    const btnLogin        = $('#btn-login');
    const btnLogout       = $('#btn-logout');
    const txtEmail        = $('#email');
    const txtPassword     = $('#password');
    const divOutput       = $('.output');
    const divLoggedInUser = $('.logged-in-user');
    const divLoginForm    = $('.login-form');
    
    // handle user login
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
                const user = JSON.parse(data);
                divOutput.html("<p>Name: " + user.full_name + "</p><p>Email: " + user.email + "</p>");
                divLoggedInUser.show();
                divLoginForm.hide();
            },
            error: (error) => {
                alert(error.responseText);
            },
            complete: (response) => {

            }
        });
    });

    // handle user logout
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
    
    // onload, request for logged in user
    $.ajax({
        url: 'app/index.php',
        method: 'GET',
        data: {
            'get_user': true
        },
        success: (data) => {
            const user = JSON.parse(data);
            divOutput.html("<p>Name: " + user.full_name + "</p><p>Email: " + user.email + "</p>");
            divLoggedInUser.show();
            divLoginForm.hide();
        },
        error: (error) => {
            // alert(error.responseText);
            divLoginForm.show();
            divLoggedInUser.hide();
        },
        complete: (response) => {

        }
    });
});