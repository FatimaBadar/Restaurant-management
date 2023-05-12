<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Access-Control-Allow-Headers, Authorization, content-type');

$servername = "localhost";
$uname="root";
$pword ="";
$dbname="restaurant";

// $userid = $_POST["userid"];

$conn =mysqli_connect($servername, $uname, $pword,$dbname);

if ($conn -> connect_error){
    die("connection failed:".mysqli_connect_error());
}

$foodname = "";
$price = $quantity = 0;

$methord = $_SERVER['REQUEST_METHOD'];

if($methord=="GET"){
    $sql = "SELECT CartID, foodname, price, quantity from ordercart";
    $result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){
    $cart = array();
    while($row = mysqli_fetch_assoc($result)){
        $cart[] = $row;
    }
    echo json_encode($cart);
}
else{
    echo json_encode(array());
}
}

mysqli_close($conn);

?>
