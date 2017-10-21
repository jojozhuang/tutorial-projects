# Create MySQL container with following commands.
docker build -t datafix-mysql:0.1 .
docker run --detach --name=dfmysql --publish 10202:3306 datafix-mysql:0.1
