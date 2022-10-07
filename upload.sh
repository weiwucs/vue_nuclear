#!/bin/bash
rm -rf ./dist
npm run build
scp -r ./dist/ hexi@47.104.172.28:/home/hexi/dock_hexi/project_hexi_java/tomcat/webapps/