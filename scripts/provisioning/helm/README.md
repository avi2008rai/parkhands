### Install helm

Run ansible playbook as root to setup helm on `localhost`. This command is executed from `./scripts/provisioning`.

```
ansible-playbook -l localhost -i inventory ./helm/setup-helm.yml -u root
```
