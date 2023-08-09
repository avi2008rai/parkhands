#!/bin/bash

sudo docker run -d --restart=unless-stopped  \
  --name rancher \
  -p 80:80 \
  -p 443:443 \
  -v /opt/rancher:/var/lib/rancher \
  rancher/rancher:v2.3.6 \
  --acme-domain rancher.parkhands.de
