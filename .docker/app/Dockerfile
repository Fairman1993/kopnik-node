# package.json в такой сборке содержит последнюю версию, однако он не соотвветствует папке node_modules.
# папка node_modules берется готовой из образа kopnik-modules

FROM kopnikorg/kopnik-modules:latest

#RUN ls -la

RUN git clone https://github.com/kopnik-org/kopnik-node /kopnik-node && cp -a /kopnik-node/. .

#WORKDIR /app
#RUN ls -la


#WORKDIR /app
#RUN cp default.env

#RUN npm install


