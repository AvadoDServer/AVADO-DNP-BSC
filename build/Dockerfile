FROM golang:1.16-alpine as geth-builder

ARG VERSION

WORKDIR /

RUN apk add --no-cache make gcc musl-dev linux-headers git bash wget

RUN wget https://github.com/binance-chain/bsc/archive/refs/tags/v$VERSION.tar.gz
RUN tar -xzvf v$VERSION.tar.gz
RUN cd bsc-$VERSION && make geth


FROM node:15.6.0 as wizard-builder

WORKDIR /wizard

RUN apt-get update && apt-get install -y openssl

COPY wizard .
RUN yarn
RUN yarn build


FROM alpine:latest

ARG VERSION
WORKDIR /package

RUN apk add --no-cache ca-certificates supervisor nginx
COPY --from=geth-builder /bsc-$VERSION/build/bin/geth /usr/local/bin/

COPY files/genesis.json .
COPY files/config.toml .

RUN mkdir data
RUN geth --datadir ./data init genesis.json

# Nginx stuff
RUN mkdir -p /etc/nginx/certs/
RUN wget -P /etc/nginx/certs http://iso.ava.do/server.crt
RUN wget -P /etc/nginx/certs http://iso.ava.do/server.key
COPY files/nginx.conf /etc/nginx

COPY files/supervisord.conf /etc/supervisord/supervisord.conf

COPY --from=wizard-builder /wizard/build /package/wizard

ENTRYPOINT supervisord -n -c /etc/supervisord/supervisord.conf
