### Install Velero CLI

Run ansible playbook as root to setup Velero CLI on `localhost`. This command is executed from `./scripts/provisioning`.

```
ansible-playbook -l localhost -i inventory ./velero/setup-velero.yml -u root
```

### Provision Velero with remote Minio storage location

```
velero install \
    --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig \
    --provider aws \
    --plugins velero/velero-plugin-for-aws:v1.0.0 \
    --bucket velero \
    --secret-file ./credentials-velero \
    --use-volume-snapshots=false \
    --use-restic \
    --backup-location-config region=minio,s3ForcePathStyle="true",insecureSkipTLSVerify="true",s3Url=https://backup-mirror.parkhands.com

```

### Restic integration

```
kubectl -n staging annotate pod/db-0 backup.velero.io/backup-volumes=postgres-data --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig

kubectl -n staging annotate pod/storage-0 backup.velero.io/backup-volumes=storage-data --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig

```


### Backup

```
velero backup create staging-backup --include-namespaces staging --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig

velero schedule create staging-daily --schedule="0 1 * * *" --include-namespaces staging --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig
```



### Simulate a disaster

```
kubectl delete namespaces staging --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig
```

### Restore

```
velero restore create --from-backup staging-backup --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig

velero restore create --from-backup staging-backup --namespace-mappings staging:staging-backup --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig

```


### Uninstall

```
kubectl delete namespace/velero clusterrolebinding/velero --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig
kubectl delete crds -l component=velero --kubeconfig /home/svilen/develop/projects/parkhands-ci/scripts/provisioning/cluster/credentials/.kubeconfig
```
