// Create image: 
docker build -t hbn-mysql:0.1 .
// Run container: 
docker run --detach --name=hnbmysql --publish 11050:3306 hbn-mysql:0.1
