#!/bin/sh

# build es5 modules
rm -rf modules
./node_modules/.bin/babel src --out-dir modules
