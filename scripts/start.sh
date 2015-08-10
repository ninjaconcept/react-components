#!/bin/sh
set -e
PATH=$(npm bin):$PATH

./build.sh
rm -rf dist
./node_modules/.bin/webpack-dev-server --hot --devtool cheap-eval-source-map