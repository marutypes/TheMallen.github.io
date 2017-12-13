#!/bin/bash
echo "Deploying..."
yarn build
git branch -D master
git checkout -b master
cp -R ./public/. ./
echo "mallorytypes.com" > ./CNAME
git add .
git commit -m "Updates"
git push origin +master
echo "✨ We did it!"
git co dev
