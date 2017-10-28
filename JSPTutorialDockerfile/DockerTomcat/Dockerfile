#Create Tomcat Image for JSP Tutorial Application
FROM tomcat
MAINTAINER jojozhuang@gmail.com

ENV JPDA_ADDRESS 8000
EXPOSE 8000
EXPOSE 8080
ENTRYPOINT ["catalina.sh", "jpda","run"]
CMD echo "jsptomcat is launched"
