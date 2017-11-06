#Create MySQL Image for Hibernate Tutorial
FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD hbn
ADD hbn_backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306