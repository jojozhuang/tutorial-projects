# Create MySQL container with following commands.
docker build -t jsptutorial-mysql:0.1 .
docker run --detach --name=jspmysql --publish 10201:3306 jsptutorial-mysql:0.1