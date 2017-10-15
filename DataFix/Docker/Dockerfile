FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD dfpassword
ADD df_backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306