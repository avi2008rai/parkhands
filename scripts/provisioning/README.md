## How to use

You will need to install Ansible on your local machine.

### Inventory

Adjust local `inventory` file for remote machines you want to provision.

### SSH Keys and ping

You need to be able to login on remote machine as `root` using SSH Key.

Be sure that you can ping with ansible to remote machine afterwards.

```
ansible rancher -m ping -i inventory -u root
```

Note: All commands run on your local machine from `./scripts/provisioning`.

### Install ansible roles

* Install ansible roles required for our playbook

```
ansible-galaxy install -r requirements.yml
```

### Provision VPS

* Run ansible playbook as root to setup server on `rancher`.

```
ansible-playbook -l rancher -i inventory ./rancher/setup-vps.yml -u root
```

### Configure SSH alias

Copy your public SSH key to `authorized_keys` for user `node` on remote machine. On your local machine, set alias to new server inside `~/.ssh/config`

```
Host parkhands_rancher
     HostName 172.104.238.10
     User node
     IdentityFile ~/.ssh/id_rsa
```
