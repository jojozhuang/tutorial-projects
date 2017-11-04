#Create MySQL Image for JPA Tutorial
FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD jpa
ADD jpa_backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306