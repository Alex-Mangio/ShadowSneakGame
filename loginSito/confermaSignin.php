<?php
session_start();
require_once("../sql/connessione.php");

if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $_SESSION['old_input'] = $_POST;
    header("Location: signin.php?error=invalid_email");
    exit();
}

if ($_POST["password"] !== $_POST["conferma-password"]) {
    $_SESSION['old_input'] = $_POST;
    header("Location: signin.php?error=wrong_password");
    exit();
}

if(!isset($_POST["remember"])){
    header("Location: ../giocoSito/paginaGame.php");
    exit();
}
$raw_query = "INSERT INTO Users (nome, cognome, email, user_password) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($raw_query);
$stmt->bind_param("ssss", $_POST["nome"], $_POST["cognome"], $_POST["email"], $_POST["password"]);
$result = $stmt->execute();

if ($result) {
    header("Location: ../menuSito/menu.php");
    exit();
} else {
    $_SESSION['old_input'] = $_POST;
    header("Location: signin.php?error=db_error");
    exit();
}
?>