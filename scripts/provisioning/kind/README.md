### Install KIND

Run ansible playbook as root to setup Kind on `localhost`. This command is executed from `./scripts/provisioning`.

```
ansible-playbook -l localhost -i inventory ./minikube/setup-kind.yml
```

### See kind in action!

Start local cluster by running:

```
kind create cluster

OR

kind create cluster --image kindest/node:v1.17.5

OR with ingress support


cat <<EOF | kind create cluster --image kindest/node:v1.17.5 --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
EOF
```

Install nginx-ingress inside cluster

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
```

Delete your local cluster:

```
kind delete cluster
```
