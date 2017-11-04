Create image: docker build -t jpa-mysql:0.1 .
Run container: docker run --detach --name=jpamysql --publish 11020:3306 jpa-mysql:0.1
