# Create MongoDB container with following commands.
docker build -t jspmongo:0.1 .
docker run --detach --name=jspmongo --publish 37017:27017 jspmongo:0.1
