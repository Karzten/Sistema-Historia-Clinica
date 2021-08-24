<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once '../../../reports/connection.php';

$query = "SELECT a.appointment_id, a.attention_number, a.register_date, CONCAT_WS(' ', p.name, p.paternal_surname, p.maternal_surname) as patient,
a.description FROM APPOINTMENT A INNER JOIN PATIENT P ON a.patient_id = p.patient_id WHERE appointment_id = 1;";

$html = "
<style>
.barcode {
    padding: 1.5mm;
    margin: 0;
    vertical-align: top;
    color: black;
}
.barcodecell {
    text-align: center;
    vertical-align: middle;
}
</style>

<table style='border-collapse: collapse' border='1'>
    <tr>
        <td style='border-bottom:1px solid; border-left:0px;border-right:0px;border-top:0px;
        '><h2 style='font-size:18px;'>DATOS DE LA CITA</h2></td>
    </tr>
</table>";
$result = $mysqli->query($query);

while($row = $result->fetch_assoc()){
    $html.="
    <br><b>Número de atención:</b>".$row['attention_number']."
    <br><br><b>Paciente:</b><br>".$row['patient']."<br>
    <br><b>Descripción:</b><br>".$row['description']."<br>
    ..........................................
    <table>
        <tr>
            <td style='text-align:center'><b>¡Gracias por su visita!</b></td><br>
        </tr>
    </table><br>
    Teléfono: xxx xxx xxx<br>
    Dirección: Jr. Alfonso Ugarte 334
    <div class='barcodecell'><barcode code='".$row['attention_number']."' type='I25' class='barcode' /><br>".$row['attention_number']."</div>
    ";
}

$mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => [80,150]]);
$mpdf->WriteHTML($html);
$mpdf->Output();

?>