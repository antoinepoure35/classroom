<?php
session_start();

if (isset($_POST['username']) && isset($_POST['password'])) {
    // Connexion à la base de données (remplacez les valeurs par celles de votre configuration)
    $db_username = 'root';
    $db_password = 'mot_de_passe_bdd';
    $db_name = 'nom_bdd';
    $db_host = 'localhost';
    $db = mysqli_connect($db_host, $db_username, $db_password, $db_name) or die('Impossible de se connecter à la base de données');

    // Échappez les entrées utilisateur pour éviter les failles de sécurité
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    // Vérifiez les informations d'authentification ici (par exemple, en comparant avec une table d'utilisateurs)
    // Si l'authentification réussit, vous pouvez définir une variable de session, par exemple :
    $_SESSION['username'] = $username;

    // Redirigez l'utilisateur vers la page principale ou une autre page sécurisée
    header('Location: page_principale.php');
    exit;
} else {
    // Gérez les erreurs ici (par exemple, affichez un message d'erreur)
    header('Location: login.php?erreur=1'); // Redirigez avec un code d'erreur
    exit;
}
?>