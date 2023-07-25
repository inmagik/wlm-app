#!/bin/bash
server='root@wlm.inmagik.com'

ssh $server 'bash -s' <<'ENDSSH'

cd /srv/wlm
docker-compose pull wlm_webapp
docker-compose up -d

ENDSSH

echo 'https://wlm.inmagik.com'