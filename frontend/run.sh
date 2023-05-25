#!/bin/sh

echo "REACT_APP_URL=$REACT_APP_URL" >> ".env"
npm run build
npm install -g serve
serve -s build