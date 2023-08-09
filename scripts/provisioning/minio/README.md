
## Generate a self-signed certificate

https://docs.minio.io/docs/how-to-secure-access-to-minio-server-with-tls.html#generate-use-self-signed-keys-certificates

openssl genrsa -out ./certs/private.key 2048

openssl req -new -x509 -days 3650 -key ./certs/private.key -out ./certs/public.crt -subj "/C=DE/ST=state/L=location/O=organization/CN=backup.parkhands.com"

ufw allow 9443
ufw status

## Login with Minio Client

docker run -it --network host --entrypoint=/bin/sh minio/mc

mc config host add backup https://backup.parkhands.com:9443 55NAuaF83nQa JPGa8ZaPwm9j7TE7 --api S3v4  --insecure

mc config host add backup-mirror https://backup-mirror.parkhands.com 55NAuaF83nQa JPGa8ZaPwm9j7TE7 --api S3v4


mc ls backup-mirror/static
mc ls backup-mirror/velero

mc mirror backup-mirror/velero backup/velero --insecure

mc ls backup/static  --insecure
mc ls backup/velero  --insecure
