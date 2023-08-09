### Configure cluster with Ansible

Run ansible playbook from your `localhost` to configure remote Kubernetes cluster via kubectl and Rancher API
This command is executed from `./scripts/provisioning/cluster`.

```
ansible-playbook -i environments/localhost/inventory pre-configure.yml --vault-password-file .vault_pass.yml
ansible-playbook -i environments/localhost/inventory post-configure.yml --vault-password-file .vault_pass.yml
```

or for production cluster using

```
ansible-playbook -i environments/production/inventory pre-configure.yml --vault-password-file .vault_pass.yml
ansible-playbook -i environments/production/inventory post-configure.yml --vault-password-file .vault_pass.yml
```
