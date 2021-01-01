# `How to use the Dockerfile`

## `How to build client`

```sh
$ docker build . -f Dockerfile.dev -t debugme/client:latest
```

## `How to run client`

```sh
$ docker run -it -p 3000:3000 -v $(pwd)/public:/app/public -v $(pwd)/src:/app/src debugme/client
```
