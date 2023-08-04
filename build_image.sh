npm install --force
npm run build
docker buildx build --platform linux/amd64 -t docker.inmagik.com/wlm/webapp .
docker push docker.inmagik.com/wlm/webapp