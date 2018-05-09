send "cd /data/biping-webapp\r"
expect "~]$"
send "unzip -o webapp.zip\r"
expect eof

