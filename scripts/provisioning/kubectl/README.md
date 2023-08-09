### Install kubectl

Run ansible playbook as root to setup kubectl on `localhost`. This command is executed from `./scripts/provisioning`.

```
ansible-playbook -l localhost -i inventory ./kubectl/setup-kubectl.yml -u root
```
