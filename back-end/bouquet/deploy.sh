docker build -t eklav/fb-bouquet:latest .
docker push eklav/fb-bouquet
# docker run -p 3000:3000 eklav/fb-bouquet
# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf