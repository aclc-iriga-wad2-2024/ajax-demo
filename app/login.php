<?php

// check if login request is sent
if (isset($_POST['login']))
{
    $email    = $_POST['email'];
    $password = $_POST['password'];

    echo "<p>$email</p>";
    echo "<p>$password</p>";
}
