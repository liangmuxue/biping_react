set ssh_string root@47.93.197.8
spawn ssh $ssh_string

expect "~]$"
send "cd /data/biping-webapp \r"
expect "~]$"
send "rm -f *.js\r"
expect eof
send "unzip -o webapp.zip\r"
expect eof

