<?php

$min=0;
$max=4;
$val=0;
function random_float ($min,$max) {
   $val=round(($min+lcg_value()*(abs($max-$min))),3);
   $bal=round(fmod($val,0.005),3);
   $val=$val-($bal);
   echo $val;

}

random_float($min,$max);

?>
