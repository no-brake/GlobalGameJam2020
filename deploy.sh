docker kill ggj20 || true
docker build -t ggj20 .
docker image prune -f
docker run --rm --name ggj20 -d -p 3033:8080 ggj20:latest