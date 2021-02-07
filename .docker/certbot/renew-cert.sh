#!/bin/sh

NGINX_DOMAIN=kopnik.org
email="alexey2baranov@gmail.com" # Adding a valid address is strongly recommended
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits

echo "### Deleting dummy certificate for $NGINX_DOMAIN ..."
rm -Rf /etc/letsencrypt/live/$NGINX_DOMAIN
rm -Rf /etc/letsencrypt/archive/$NGINX_DOMAIN
rm -Rf /etc/letsencrypt/renewal/$NGINX_DOMAIN.conf
echo

echo "### Requesting Let's Encrypt certificate for $NGINX_DOMAIN ..."

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    --email alexey2baranov@gmail.com \
    -d $NGINX_DOMAIN \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal
