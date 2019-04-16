FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/cassandra_nest
ADD package.json /var/www/cassandra_nest
RUN yarn install

ADD . /var/www/cassandra_nest

RUN ["chmod", "+x", "/var/www/cassandra_nest/start.sh"]

EXPOSE 4000

CMD ["./start.sh"]