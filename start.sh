#!/bin/bash
echo "-- stopping apnex/web --"
docker rm -f web 2>/dev/null
echo "-- removing untagged containers --"
docker rmi -f $(docker images -q --filter dangling=true) 2>/dev/null
echo "-- removing orphaned volumes --"
docker rm -v $(docker ps -a -q -f status=exited) 2>/dev/null
echo "-- starting apnex/web --"
docker run -id \
	--name web \
	-p 5099:80 \
	-v ${PWD}:/usr/share/nginx/html \
nginx:stable-alpine
#	-v ${PWD}/html:/usr/share/nginx/html \
