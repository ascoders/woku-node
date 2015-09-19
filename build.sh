#!/bin/bash

if [[ $1 == "install" ]]
then
  echo '[install fis3..]'
  npm install -g fis3

  echo '[intall pm2..]'
  npm install -g pm2

  echo '[install fis plugs..]'
  npm install fis-parser-babelcore
  npm install fis-parser-less
  npm install fis-optimizer-html-minifier

  echo '[install koa plugs]'
  npm install koa
  npm install koa-router
  npm install koa-redis
  npm install koa-static
  npm install koa-static-cache
  npm install koa-conditional-get
  npm install koa-etag
  npm install koa-bodyparser

  echo '[install server plugs]'
  npm install node-schedule
  npm install mysql
  npm install redis
  npm install sequelize
  npm install validator
  npm install co-body
  npm install nodemailer
  npm install nodemailer-smtp-transport
  npm install log4js

  echo '[install code cover plugs]'
  npm install blanket
  npm install travis-cov

  echo '[install test plugs]'
  npm install -g mocha
  npm install should
  npm install co-mocha
  npm install muk
  npm install rewire
  npm install superagent

  exit
fi

if [[ $1 == "test" ]]
then

    export NODE_APP_DEV=true

    pm2 delete app.js
    pm2 start app.js

    echo '[run cover& created coverage.html]'
    mocha -R travis-cov "test/**/*.js"
    mocha -R html-cov > coverage.html "test/**/*.js"

    echo '[run test]'
    mocha "test/**/*.js" -s 10

    pm2 delete app.js

  exit
fi

export NODE_APP_DEV=false

echo '[run pm2]'
pm2 delete app.js
pm2 start app.js --watch --ignore-watch="src static test node_modules" --merge-logs -f

echo '[run fis3 dev mode..]'
fis3 release -d static -r src -f fis-conf.js -w -l
