### Install minikube

Run ansible playbook as root to setup minikube on `localhost`. This command is executed from `./scripts/provisioning`.

```
ansible-playbook -l localhost -i inventory ./minikube/setup-minikube.yml
```

### See minikube in action!

Start a cluster by running:

```
minikube start

OR

minikube start --kubernetes-version v1.17.3

Even more options

minikube start --memory 4096 --cpus 3 --disk-size 50GB --vm-driver virtualbox --bootstrapper=kubeadm minikube start --kubernetes-version v1.17.3
```

Access the Kubernetes Dashboard running within the minikube cluster:

```
minikube dashboard
```

Once started, you can interact with your cluster using kubectl, just like any other Kubernetes cluster. For instance, starting a server:

```
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
```

Exposing a service as a NodePort

```
kubectl expose deployment hello-minikube --type=NodePort --port=8080
```

minikube makes it easy to open this exposed endpoint in your browser:

```
minikube service hello-minikube
```

Start a second local cluster (note: This will not work if minikube is using the bare-metal/none driver):

```
minikube start -p cluster2
```

Stop your local cluster:

```
minikube stop
```

Delete your local cluster:

```
minikube delete
```

Delete all local clusters and profiles

```
minikube delete --all
```
