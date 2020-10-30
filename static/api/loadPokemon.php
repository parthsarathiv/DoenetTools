<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db_connection.php";

$pokemonname = $_GET["pokemonId"];

$sql="
SELECT
name,
hp,
attack,
defence,
speed
FROM pokemons
WHERE name = '$pokemonname'
";

$result = $conn->query($sql);
$pokemon = array();

if($row = $result->fetch_assoc()){ 
    $pokemon = array(
          "name" => $row["name"],
          "attack" => $row["attack"],
          "defence" => $row["defence"],
          "hp" => $row["hp"],
          "speed" => $row["speed"],
    );
}
    
// set response code - 200 OK
http_response_code(200);

// make it json format
echo json_encode($pokemon);

$conn->close();

?>