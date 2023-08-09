## Testing library

Fortio load testing library, command line tool, advanced echo server and web UI in go (golang). Allows to specify a set query-per-second load and record latency histograms and other useful stats.

<https://fortio.org/>

<https://github.com/fortio/fortio>

## Start testing server

```
docker run -p 8080:8080 -p 8079:8079 fortio/fortio server &
```

Once fortio server is running, you can visit its web UI at <http://localhost:8080/fortio/>

## Running load tests

```
docker run fortio/fortio load \
  -c 1 \
  -qps 0 \
  -t 3s \
  -curl \
  -content-type "application/json; charset=utf-8" \
  -payload '{"query":"mutation Login($payload: LoginInputRecordInput!) {\n  login(input: {payload: $payload}) {\n    jwtToken\n  }\n}\n","variables":{"payload":{"email":"single_member@parkhands.de","password":"12345678","rememberMe":true}},"operationName":"Login"}' \
  "https://api.parkhands.com/graphql"
```

## Load testing

### 1 minute, 0 qps, 32 threads

```
docker run fortio/fortio load \
  -c 32 \
  -qps 0 \
  -t 60s \
  -content-type "application/json; charset=utf-8" \
  -payload '{"query":"mutation Login($payload: LoginInputRecordInput!) {\n  login(input: {payload: $payload}) {\n    jwtToken\n  }\n}\n","variables":{"payload":{"email":"single_member@parkhands.de","password":"12345678","rememberMe":true}},"operationName":"Login"}' \
  "https://api.parkhands.com/graphql"
```

### 5 minutes, 0 qps, 32 threads

```
docker run fortio/fortio load \
  -c 32 \
  -qps 0 \
  -t 300s \
  -content-type "application/json; charset=utf-8" \
  -payload '{"query":"mutation Login($payload: LoginInputRecordInput!) {\n  login(input: {payload: $payload}) {\n    jwtToken\n  }\n}\n","variables":{"payload":{"email":"single_member@parkhands.de","password":"12345678","rememberMe":true}},"operationName":"Login"}' \
  "https://api.parkhands.com/graphql"
```

### 100k connections, 32 threads

```
time docker run fortio/fortio load \
  -c 32 \
  -qps 0 \
  -n 100000 \
  -content-type "application/json; charset=utf-8" \
  -payload '{"query":"mutation Login($payload: LoginInputRecordInput!) {\n  login(input: {payload: $payload}) {\n    jwtToken\n  }\n}\n","variables":{"payload":{"email":"single_member@parkhands.de","password":"12345678","rememberMe":true}},"operationName":"Login"}' \
  "https://api.parkhands.com/graphql"
```

### 1k connections, 32 threads

```
time docker run fortio/fortio load \
  -c 32 \
  -qps 0 \
  -n 10000 \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwX3N1cGVyX2FkbWluIiwiaWQiOiJmYmMwY2M1My02MDJiLTRhYjYtYjY1YS1mZThlNjBjNTdhMDkiLCJleHAiOjE2MzEyNzIwNTcsImlhdCI6MTU5OTczNjA1NywiYXVkIjoicG9zdGdyYXBoaWxlIiwiaXNzIjoicG9zdGdyYXBoaWxlIn0.ju48cpZPijA3o4b29HKEROlZ7pCy5akEw1ue9nSNnYU' \
  -H 'content-type: application/json' \
  -content-type "application/json; charset=utf-8" \
  -payload '{"query":"query FindSlots(\n    $lat: BigFloat!\n    $lng: BigFloat!\n    $distance: Int\n    $startTime: Datetime\n    $endTime: Datetime\n    $ownerId: UUID\n) {\n  findSlotsList(\n    payload: {\n      includeBooked: true\n      distance: $distance\n      latitude: $lat\n      longitude: $lng\n      startTime: $startTime\n      endTime: $endTime\n      ownerId: $ownerId\n    }\n  ) {\n    id\n    name\n    photoUrl\n    status\n    ownerId\n    location {\n      geojson\n      longitude\n      latitude\n    }\n  }\n}","variables":{"lat":52.251487,"lng":10.518043},"operationName":"FindSlots"}' \
  "https://api.parkhands.com/graphql"
```

## Statistics & Load

- <https://rancher.parkhands.de/k8s/clusters/c-r7zw5/api/v1/namespaces/cattle-prometheus/services/http:access-grafana:80/proxy/d/BNvdNy6Wk/postgresql-performance-analysis-good>
- <https://rancher.parkhands.de/k8s/clusters/c-r7zw5/api/v1/namespaces/cattle-prometheus/services/http:access-grafana:80/proxy/d/FnxG5TYiz/nodes?orgId=1&var-node=192.168.130.214:9796&from=now-30m&to=now>
