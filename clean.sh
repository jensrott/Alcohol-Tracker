#!/usr/bin/env bash

DIRECTORY="node_modules/"

echo "Removing ${DIRECTORY}..."

rm -rf $DIRECTORY

cd client/
rm -rf $DIRECTORY

cd ..

cd backend/
rm -rf vendor/

echo "Creating zip file..."

cd ../..

cd helpers/

# Call node.js helper script
node send-latest-version.js

# Open in WeTransfer in main browser
start https://wetransfer.com/

# Open folder in explorer on windows, in Unix systems use open .
cd ..

if [[ "$OSTYPE" == msys ]];
then 
    start .

elif [[ "$OSTYPE" == linux ]]
then
    open .

elif [[ "$OSTYPE" == darwin ]]
then  
    open .
fi