<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    echo "
    <!DOCTYPE html>
    <html lang=it>
    <head>
    <link rel=stylesheet href=style.css>
    </head>
    <body>
        <div id=modal class=modal>
            <div class=modal-content>
                <p>Effettua il login per votare il gioco</p>
                <button onclick=window.location.href='../loginSito/login.php'>Vai al login</button>
            </div>
        </div>
    </body>
    </html>";
    exit();
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Recensione - Shadow Sneak</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="review-container">
        <h2>Lascia una recensione!</h2>
        <form action="salvaRecensione.php" method="POST">
            <label for="rating">Quanto ti è piaciuto il gioco?</label>
            <div class="star-rating">
                <input type="radio" name="rating" value="5" id="5"><label for="5">★</label>
                <input type="radio" name="rating" value="4" id="4"><label for="4">★</label>
                <input type="radio" name="rating" value="3" id="3"><label for="3">★</label>
                <input type="radio" name="rating" value="2" id="2"><label for="2">★</label>
                <input type="radio" name="rating" value="1" id="1"><label for="1">★</label>
            </div>
            <label for="comment">Perché ti è piaciuto? (opzionale)</label><br>
            <textarea name="comment" rows="5" cols="50" placeholder="Scrivi il tuo commento..."></textarea><br><br>
            <button type="submit">Invia Recensione</button>
        </form>
    </div>

    <script src="stelle.js"></script>
</body>
</html>