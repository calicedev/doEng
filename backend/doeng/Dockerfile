# JAVA Version
# alpine is light than JDK only but alpine only supported sh scripts not bash script
FROM openjdk:11

# Define argument using ARG
# Setting your path which located .jar file
ARG JAR_FILE_PATH=build/libs/doeng-0.0.1-SNAPSHOT.jar

# Copy .jar to app.jar
COPY $JAR_FILE_PATH app.jar

# Execute Command in container
ENTRYPOINT java -jar /app.jar --server.port=8200

# Written by holicmiku who posts this notion.
