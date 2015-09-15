#!/bin/bash

if [[ $1 == "install" ]]
then
  echo 'install fis3..'
  npm install -g fis3

  echo 'intall pm2..'
  npm install -g pm2

  echo 'install fis plugs..'
  npm install fis-parser-babelcore
  npm install fis-parser-less
  npm install fis-optimizer-html-minifier

  echo 'install koa plugs'
  npm install koa
  npm install koa-router
  npm install koa-redis
  npm install koa-static
  npm install koa-static-cache
  npm install koa-conditional-get
  npm install koa-etag
  npm install koa-bodyparser

  echo 'install server plugs'
  npm install node-schedule
  npm install mysql
  npm install sequelize
  npm install validator
  npm install nodemailer
  npm install nodemailer-smtp-transport

  echo 'install code cover plugs'
  npm install blanket

  echo 'install test plugs'
  npm install -g mocha
  npm install should
fi

echo 'run test'
mocha --harmony --require blanket "test/**/*.js"

echo 'run pm2'
pm2 delete all
pm2 start app.js --node-args="--harmony" --watch --ignore-watch="src static test node_modules" --merge-logs -f

echo 'run fis3 dev mode..'
fis3 release -d static -r src -f fis-conf.js -w -l
