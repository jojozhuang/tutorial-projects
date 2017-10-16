FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD jsppassword
ADD jsp_backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306