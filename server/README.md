# `How to use the Dockerfile`

## `How to build server`

```sh
$ docker build . -f Dockerfile.dev -t debugme/server:latest
```

## `How to run server`

```sh
$ docker run -it -e PORT=4000 -p 4000:4000 -v $(pwd):/app debugme/server
```
