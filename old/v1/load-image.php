<?php
if (isset($_GET['filename'])) {
    // https://stackoverflow.com/questions/900207/return-a-php-page-as-an-image
    $path = './img/tiles/' . $_GET['filename'];
    $fp   = fopen($path, 'rb');
    if ($fp) {
        header("Content-Type: image/png");
        header("Content-Length: " . filesize($path));

        fpassthru($fp);
        fclose($fp);
        exit;
    }
}
http_response_code(400);
exit;