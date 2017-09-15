#Create Mysql Image for JPA Tutorial
FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD jpa
ADD jpa_backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306

# Create image: docker build -t jpa-mysql:0.1 .
# Run container: docker run --detach --name=jpamysql --publish 11020:3306 jpa-mysql:0.1
