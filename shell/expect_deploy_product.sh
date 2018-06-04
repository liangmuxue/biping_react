set ssh_string root@47.75.50.237
spawn ssh $ssh_string

expect "~]$"
send "cd /data/biping-webapp \r"
expect "~]$"
send "unzip -o webapp.zip\r"
expect eof
send "rm -f *.js\r"
expect eof

