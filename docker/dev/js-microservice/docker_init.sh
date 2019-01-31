#!/bin/bash

echo "
Install npm packages for node app...
"
sudo npm install --prefix /usr/src/app
node $MICROSERVICE_PATH