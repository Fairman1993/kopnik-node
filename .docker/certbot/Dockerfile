FROM certbot/certbot
WORKDIR /


RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*


COPY init-dummy-cert-if-nothing-exists.sh .
RUN chmod +x /init-dummy-cert-if-nothing-exists.sh

COPY renew-cert.sh .
RUN chmod +x /renew-cert.sh

# перезатераются после волума в докер-компоузе
#RUN curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > /etc/letsencrypt/options-ssl-nginx.conf
#RUN curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > /etc/letsencrypt/ssl-dhparams.pem
