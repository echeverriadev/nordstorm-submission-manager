# Submissions Manager
Submissions Manager.

## Prerequisites
This guide assumes that you have the following:
 - Ubuntu 18.04.02 server

## Software Requirements
The Submissions Manager use these software:
* [NodeJs] - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express] - Fast, unopinionated, minimalist web framework for Node.js.
* [ReactJs] - Fast, unopinionated, minimalist web framework for Node.js.
* [PM2] - Advanced Node.js process manager.
* [Nginx] - High Performance Load Balancer, Web Server, & Reverse Proxy.
* [MySql] - The world's most popular open source database!


## Source Code from repository
The Submissions Manager use the bitbucket repository:
* [nord_submissions] - Nord Submissions source code !

**You need credentials**

## Installation Guide

### 1.- Install [NodeJs]

```sh
#curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
#sudo apt-get install -y nodejs
```

### 2.- Install [nord_submissions] from repository, and settings.
#### Steps for first time installation
```sh
#cd /home
#git clone https://dfortiz@bitbucket.org/rjakes/nord_submissions.git
#cd /home/nord_submissions/web
#npm install
#cd /home/nord_submissions/api
#npm install
```
**You need credentials for the repository**
**Don't forget to configure the /home/nord_submissions/api/.env file, example:**
```sh
PORT=5000
DB_HOST=localhost
DB_USER=DBUSER
DB_PASS=SECRETPASSWORD
DB_NAME=DATABASENAME
```
**Don't forget to configure the /home/nord_submissions/web/.env file, example:**
```sh
REACT_APP_API_URL=https://ndsm.rjakes.com/api
```
#### Steps for updates
```sh
#cd /home/nord_submissions/
#git pull origin master
```
**You need credentials for the repository**
**Don't forget check if you need packages updates**

### 3.- Install [PM2] and settings and operations
#### Installation
```sh
#npm install -g pm2
```
#### Settings
```sh
#cd /home/nord_submissions/api
#pm2 start src/index.js
#pm2 status
#cd /home/nord_submissions/web
#pm2 start npm -- start
#pm2 status
#pm2 startup
```
#### Operations
##### Show Service status
```sh
#pm2 status
```
##### Restart Service with id 0
```sh
#pm2 Restart 0
```
##### Restart Service with id 1
```sh
#pm2 Restart 1
```
**for every update on the source code you need to restart the services**


### 4.- Install [Nginx] and setting
##### Installation

```sh
#apt install nginx
```
##### Settings
```sh
#cd /etc/nginx/sites/available
#nano default
```
**Base Example for /etc/nginx/sites-available/default:**
```sh
server {
    listen 80;
    server_name ndsm.rjakes.com;
    return 301 https://$host$request_uri;
}

server {
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    index index.html;
    server_name ndsm.rjakes.com;
    ssl_certificate /etc/letsencrypt/live/ndsm.rjakes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ndsm.rjakes.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;


location / {
	proxy_pass http://localhost:3000;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_buffering off;
	proxy_redirect http:// https://;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection 'upgrade';
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /api/ {
	proxy_pass http://localhost:5000;
}
}
```

### 5.- Install [MySql] and settings
##### Installation and setup
```sh
#apt install mysql
#mysql_secure_installation
```
##### Restore database
**upload a database dump, for example: /root/database-dump-backup.sql**

```sh
#mysql -u[user] -p [DATABASENAME] < /root/database-dump-backup.sql
```


##Submissions Manager
cd /file/
* run npm install
* run npm initialize
##Running

run npm start

###Database

* schema /ROOT/database/fit_schema_XXXX-XX-XX.sql
* sample data /ROOT/database/sample_data_XXXX-XX-XX.sql

---


[MySql]: <https://www.mysql.com/>
[Nginx]: <https://www.nginx.com/>
[NodeJs]: <http://nodejs.org>
[Express]: <http://expressjs.com>
[ReactJs]: <https://reactjs.org>
[PM2]: <http://pm2.keymetrics.io/>
[nord_submissions]: <https://bitbucket.org/rjakes/nord_submissions>
