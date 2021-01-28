# blobster-relay

Dockerhub repo: [ennisj/blobster-relay](https://hub.docker.com/r/ennisj/blobster-relay)

Blobster normally works passively, receiving JSON blobs through a traditional HTTP interface. This is problematic when attempting to connect to Blobster from within the sandboxed network docker containers run in. As an alternative, this image will automatically accept a websocket connection (on port 8109 by default) from Blobster, relaying blobs it receives from within the docker network to the application.

Here's a quick example docker-compose service to setup the relay:
```
services:
  blobster:
    image: ennisj/blobster-relay
    ports:
      - 8109:8109
```
Then, from another service you can POST blobs to the relay at ``http://blobster:8108/blob``.

The incoming and outgoing ports can be configured with environment variables:
```
services:
  relay:
    image: ennisj/blobster-relay
    ports:
      - 8111:8111
    environment:
      - INCOMING_PORT=8100
      - OUTGOING_PORT=8111
```


