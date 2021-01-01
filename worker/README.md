# `How to use the Dockerfile`

## `How to build worker`

```sh
$ docker build . -f Dockerfile.dev -t debugme/worker:latest
```

## `How to run worker`

```sh
$ docker run -it -v $(pwd):/app debugme/worker
```
