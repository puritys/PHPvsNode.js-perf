<?php 
$port = "8080";
$addr = "192.168.56.2";
$sock = socket_create_listen($port); 
$port_file = "/tmp/php_server";
socket_getsockname($sock, $addr, $port); 
print "Server Listening on $addr:$port\n"; 
$fp = fopen($port_file, 'w'); 
fwrite($fp, $port); 
fclose($fp); 
while($c = socket_accept($sock)) { 
    /* do something useful */ 
    socket_getpeername($c, $raddr, $rport); 
    $text = <<<HTML
Header: xxxx

<html>
</html>
HTML;
    socket_write($c, $text, strlen($text));
    socket_shutdown($c, 2);
    socket_close($c);
//    print "Received Connection from $raddr:$rport\n\n"; 
} 
socket_close($sock); 
?> 
