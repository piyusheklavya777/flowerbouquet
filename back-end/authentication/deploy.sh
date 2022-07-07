docker build -t eklav/fb-auth:latest .
docker push eklav/fb-auth
# docker run -p 3000:3000 eklav/fb-auth
# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf