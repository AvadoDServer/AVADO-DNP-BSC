FROM golang:1.16-alpine as builder

ARG VERSION

WORKDIR /

RUN apk add --no-cache make gcc musl-dev linux-headers git bash

RUN wget https://github.com/binance-chain/bsc/archive/refs/tags/v$VERSION.tar.gz
RUN tar -xzvf v$VERSION.tar.gz
RUN cd bsc-$VERSION && make geth


FROM alpine:latest

ARG VERSION

RUN apk add --no-cache ca-certificates curl jq tini
COPY --from=builder /bsc-$VERSION/build/bin/geth /usr/local/bin/

RUN wget https://github.com/binance-chain/bsc/releases/download/v$VERSION/mainnet.zip
RUN unzip mainnet.zip
RUN mkdir -p /package/data
RUN geth --datadir /package/data init genesis.json

ENTRYPOINT geth --config ./config.toml --datadir /package/data  --cache 18000 --rpc.allow-unprotected-txs --txlookuplimit 0
