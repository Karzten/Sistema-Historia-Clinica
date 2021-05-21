<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
            
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
    require '../../model/user.php';
    $UM = new user_model();
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT, ['cost'=>10]);
    $txtpassword = htmlspecialchars($_POST['password'], ENT_QUOTES, 'UTF-8');
    $query = $UM->RestorePassword($email, $password);
    if($query=="1"){
            //Instantiation and passing `true` enables exceptions
            $mail = new PHPMailer(true);

            try {
                $mail->SMTPOptions = array(
                    'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                    )
                );
                //Server settings
                $mail->SMTPDebug = 0;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'sistemaclinica002@gmail.com';                     //SMTP username
                $mail->Password   = '(Homero1234)';                               //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

                //Recipients
                $mail->setFrom('sistemaclinica002@gmail.com', 'Administrador SysClinic');
                $mail->addAddress($email);     //Add a recipient

                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'Restablecer contraseña';
                $mail->Body    = 'Su contraseña fue restablecida<br> Nueva contrase&ntilde;a: <b>'.$txtpassword.'</b>';

                $mail->send();
                echo '1';
            } catch (Exception $e) {
                echo "0";
            }
    }else{
        echo "3";
    }
    
?>