<?php
session_start();
$errorMsg = "";
if(isset($_GET["error"])){
  switch($_GET["error"]){
    case "invalid_email":
      $errorMsg = "Inserisci una mail valida";
      break;
    case "wrong_password":
      $errorMsg = "Le password non corrispondono";
      break;
  }
}
$old_input = $_SESSION['old_input'] ?? [];
unset($_SESSION['old_input']);
?>

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/x-icon" href="../giocoSito/gameImages/hooded_skeletal_character_final_32x32.png" sizes="64x64" />
  <title>Sign-in - Shadow Sneak</title>
  <link rel="stylesheet" href="./signin.css" />
</head>
<body>
  <div class="login-container">
    <div class="login-box">
      <h2>SIGN-IN FOR START PLAYING</h2>
      <?php if ($errorMsg): ?>
        <div class="error-message" style="color: red; margin-bottom: 10px;">
          <?= htmlspecialchars($errorMsg) ?>
        </div>
      <?php endif; ?>
      <form action="confermasignin.php" method="POST">
        <div class="textbox">
          <input type="text" placeholder="Nome" name="nome" required
          value="<?= htmlspecialchars($old_input['nome'] ?? '') ?>" />
        </div>
        <div class="textbox">
          <input type="text" placeholder="Cognome" name="cognome" required
          value="<?= htmlspecialchars($old_input['cognome'] ?? '') ?>" />
        </div>
        <div class="textbox">
          <input type="email" placeholder="Email" name="email" required
          value="<?= htmlspecialchars($old_input['email'] ?? '') ?>" />
        </div>
        <div class="textbox">
          <input type="password" placeholder="Password" name="password" required />
        </div>
        <div class="textbox">
          <input type="password" id="password" placeholder="Conferma Password" name="conferma-password" required />
          <span id="toggle-password" class="eye-icon">👁️</span>
        </div>
        <div class="remember-me">
          <label>
            <input type="checkbox" name="remember" <?= isset($old_input['remember']) ? 'checked' : '' ?> /> Remember me
          </label>
        </div>
        <div class="signup-link">
          <p>Do you have an account? <a href="login.php">Log-in</a></p>
        </div>
        <div class="submit-btn">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>

  <script src="login.js"></script>
</body>
</html>