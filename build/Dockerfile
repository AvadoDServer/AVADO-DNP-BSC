FROM golang:1.16-alpine as builder

ARG VERSION

WORKDIR /

RUN apk add --no-cache make gcc musl-dev linux-headers git bash wget

RUN wget https://github.com/binance-chain/bsc/archive/refs/tags/v$VERSION.tar.gz
RUN tar -xzvf v$VERSION.tar.gz
RUN cd bsc-$VERSION && make geth

RUN wget http://iso.ava.do/server.crt
RUN wget http://iso.ava.do/server.key


FROM alpine:latest

ARG VERSION
WORKDIR /package

RUN apk add --no-cache ca-certificates supervisor nginx
COPY --from=builder /bsc-$VERSION/build/bin/geth /usr/local/bin/

COPY files/genesis.json .
COPY files/config.toml .

RUN mkdir data
RUN geth --datadir ./data init genesis.json

# Nginx stuff
RUN mkdir -p /etc/nginx/certs/
COPY files/nginx.conf /etc/nginx
COPY --from=builder /server.crt /etc/nginx/certs
COPY --from=builder /server.key /etc/nginx/certs

COPY files/supervisord.conf /etc/supervisord/supervisord.conf

ENTRYPOINT supervisord -n -c /etc/supervisord/supervisord.conf
