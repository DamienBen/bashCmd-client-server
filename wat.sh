#!/bin/bash

set -ea -o pipefail

PORT=9999
ADDRESS=192.168.10.46
PARAMS=${@:1}
ARGSVAL=false

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
