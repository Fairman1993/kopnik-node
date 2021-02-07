#!/bin/sh

#mkdir -p /etc/letsencrypt/live

echo "### HARDCODE NGINX_DOMAIN=kopnik.org"
NGINX_DOMAIN=kopnik.org
echo

if [ ! -e "/etc/letsencrypt/options-ssl-nginx.conf" ] || [ ! -e "/etc/letsencrypt/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > /etc/letsencrypt/options-ssl-nginx.conf
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > /etc/letsencrypt/ssl-dhparams.pem  echo
fi

if [ -d "/etc/letsencrypt/live/$NGINX_DOMAIN" ]; then
  echo "### Skip creating dummy certificate for $NGINX_DOMAIN. /etc/letsencrypt/live/$NGINX_DOMAIN already exists"
    exit
fi

echo "### Creating dummy certificate for $NGINX_DOMAIN ..."
mkdir -p "/etc/letsencrypt/live/$NGINX_DOMAIN"

openssl req -x509 -nodes -newkey rsa:4096 -days 1\
   -keyout "/etc/letsencrypt/live/$NGINX_DOMAIN/privkey.pem" \
   -out "/etc/letsencrypt/live/$NGINX_DOMAIN/fullchain.pem" \
   -subj "/CN=localhost"
