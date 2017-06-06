#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "$1" ] 
then
  echo "installing default glimpse version"
  version=""
elif [ $1 = "--help" ] || [ $1 = "--h" ] || [ $1 = "-h" ] || [ $1 = "-?" ]
then
  echo "usage: useAlphaFeed.sh <version>"
  echo "usage: useAlphaFeed.sh 0.21.4"
  exit 0
else
  echo "installing glimpse version $1"
  version=@$1
fi

restore_glimpse_registry=`npm config get @glimpse:registry`
npm config set @glimpse:registry=https://www.myget.org/F/g-alpha/npm/

function npmInstallGlimpse {
  pushd $DIR/$1
  echo installing @glimpse/glimpse$version
  npm install @glimpse/glimpse$version
  popd
}

function npmInstallGlimpseAgent {
  pushd $DIR/$1
  npm install @glimpse/glimpse-agent-node$version
  popd
}

npmInstallGlimpseAgent calculator.addition 
npmInstallGlimpseAgent calculator.batch
npmInstallGlimpseAgent calculator.multiply 
npmInstallGlimpseAgent calculator.subtract 
npmInstallGlimpseAgent calculator.division 
npmInstallGlimpse calculator.web

if [ restore_glimpse_registry == "undefined" ] 
then
  npm config delete @glimpse:registry
else
  npm config set @glimpse:registry=$restore_glimpse_registry
fi