<?php
//
if(isset($_POST["loginBtn"])){
    $formData=file_get_contents("php://input");
    print("Hi walid");
    echo ("Hi walid");
    echo ($formData);
    echo ($formData["userName"]);
}else{
    print("not correct");

}

?>