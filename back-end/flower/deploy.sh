docker build -t eklav/fb-flower:latest .
docker push eklav/fb-flower
# docker run -p 3000:3000 eklav/fb-flower
# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf