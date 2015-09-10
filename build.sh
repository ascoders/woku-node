#!/bin/bash

if [[ $1 == "install" ]]
then
  echo 'start install fis3..'
  npm install -g fis3

  echo 'start npm install..'
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

if [[ $1 == "run" ]]
then
    node --harmony app.js
fi

echo 'run fis3 dev mode..'
fis3 release -d static -r src -f fis-conf.js -w -l
