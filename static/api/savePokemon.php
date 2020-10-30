<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

include "db_connection.php";

    $_POST = json_decode(file_get_contents("php://input"),true);
    $pokemon = $_POST['pokemonId'];
    $newHP = (int)$_POST['newHP'];

    var_dump($newHP);

    $sql = "UPDATE pokemons
                SET hp = $newHP
                WHERE name = '$pokemon'";

    $result = $conn->query($sql);

    if ($result === TRUE) {
        // set response code - 200 OK
        http_response_code(200);
    }else {
        echo "Error: " . $sql . "\n" . $conn->error;
    }

    $conn->close();

?>
    
  