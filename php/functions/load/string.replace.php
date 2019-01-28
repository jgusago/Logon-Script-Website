<?php
function string_replace($replacements, $string){
    $string = explode("?",$string);
    $newstring = "";

    for($x = 0; $x < sizeof($string); $x++){
      $newstring = $newstring.$string[$x];
      if($x < sizeof($replacements)){
        $newstring = $newstring.$replacements[$x];
      }
    }

    return $newstring;
  }
?>
