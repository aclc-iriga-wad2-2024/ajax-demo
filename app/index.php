<?php

// temporary valid users
$valid_users = [
    [
        'full_name' => 'John Diddies',
        'email'     => 'johndiddies@example.com',
        'password'  => '123456'
    ],
    [
        'full_name' => 'Mary Kakampink',
        'email'     => 'marykakampink@example.com',
        'password'  => '123456'
    ]
];

// check if login request is sent
if (isset($_POST['login']))
{
    $email    = trim($_POST['email']);
    $password = trim($_POST['password']);

    // check if email and password are provided
    if (empty($email) || empty($password)) {
        http_response_code(403);
        echo "Empty email or password!";
    }

    // continue with login
    else {
        // scan for auth user
        $auth_user = null;
        foreach ($valid_users as $valid_user) {
            if (strtolower($email) === strtolower($valid_user['email']) && $password === $valid_user['password']) {
                $auth_user = $valid_user;
            }
        }

        // check if there was an $authenticated_user
        if ($auth_user === null) {
            http_response_code(403);
            echo "Invalid email or password!";
        }
        else {
            $logged_in_user = ['email' => $auth_user['email'], 'full_name' => $auth_user['full_name']];

            setcookie('auth_user', json_encode($logged_in_user), time() + (86400 * 30), '/');

            echo json_encode($logged_in_user);
        }
    }
}

// check for logged in user
else if($_GET['get_user']) {
    if (isset($_COOKIE['auth_user'])) {
        echo $_COOKIE['auth_user'];
    }
    else {
        http_response_code(403);
        echo "Please login first.";
    }
}

// logout user
else if (isset($_POST['logout'])) {
    setcookie('auth_user', '', time() - 86400, '/');
}
