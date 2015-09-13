#!/bin/bash

if [[ $1 == "install" ]]
then
  echo 'install fis3..'
  npm install -g fis3

  echo 'insatll pm2..'
  npm install -g pm2

  echo 'install npm plugs..'
  npm install fis-parser-babelcore
  npm install fis-parser-less
  npm install koa
  npm install koa-router
  npm install koa-redis
  npm install koa-static
  npm install koa-static-cache
  npm install koa-conditional-get
  npm install koa-etag
  npm install koa-bodyparser
  npm install node-schedule
  npm install mysql
  npm install sequelize
  npm install validator
fi

echo 'run pm2'
sudo pm2 delete all
sudo pm2 start app.js --node-args="--harmony" --watch --ignore-watch="src static node_modules" --merge-logs -f

echo 'run fis3 dev mode..'
fis3 release -d static -r src -f fis-conf.js -w -l
