<?php 
session_start();
require_once("../sql/connessione.php");

if (!isset($_POST["email"]) || !isset($_POST["password"])) {
    header("Location: login.php?error=invalid_credentials");
    exit();
}

$email = trim($_POST["email"]);
$password = trim($_POST["password"]);

$query = "SELECT * FROM Users WHERE email = ? AND user_password = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    header("Location: login.php?error=invalid_credentials");
    exit();
}

$user = $result->fetch_assoc();
$_SESSION["user_id"] = $user["id_user"];
$_SESSION["email"] = $user["email"];

header("Location: ../giocoSito/paginaGame.php");
exit();
?>