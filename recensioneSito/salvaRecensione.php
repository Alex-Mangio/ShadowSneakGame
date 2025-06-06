<?php
session_start();
require_once("../sql/connessione.php");

if (!isset($_SESSION["user_id"]) || !isset($_POST["rating"])) {
    header("Location: recensione.php");
    exit();
}

$userId = $_SESSION["user_id"];
$rating = intval($_POST["rating"]);
$comment = isset($_POST["comment"]) && trim($_POST["comment"]) !== "" ? trim($_POST["comment"]) : null;

$query = "INSERT INTO recensioni (user_id, voto, descrizione) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iis", $userId, $rating, $comment);
$stmt->execute();

header("Location: ../menuSito/menu.php");
exit();
?>