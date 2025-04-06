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

// login request
if (isset($_POST['login']))
{
    // get inputs
    $email    = trim($_POST['email']);
    $password = trim($_POST['password']);

    // validate inputs
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

        // validate auth user
        if ($auth_user === null) {
            http_response_code(403);
            echo "Invalid email or password!";
        }

        // set logged-in user
        else {
            // encode logged-in user to JSON
            $logged_in_user_json = json_encode(['email' => $auth_user['email'], 'full_name' => $auth_user['full_name']]);

            // save logged-in user JSON to cookie
            setcookie('auth_user', $logged_in_user_json, time() + (86400 * 30), '/');

            // respond with logged-in user JSON
            echo $logged_in_user_json;
        }
    }
}

// logout request
else if (isset($_POST['logout'])) {
    // make auth user expired
    setcookie('auth_user', '', time() - 86400, '/');
}

// get logged-in user request
else if($_GET['get_user']) {
    if (isset($_COOKIE['auth_user'])) {
        echo $_COOKIE['auth_user'];
    }
    else {
        http_response_code(403);
        echo "Please login first.";
    }
}