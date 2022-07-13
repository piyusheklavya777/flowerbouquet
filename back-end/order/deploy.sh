docker build -t eklav/fb-order:latest .
docker push eklav/fb-order
# docker run -p 3000:3000 eklav/fb-order
# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf