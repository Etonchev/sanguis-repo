FROM gradle:8.6-jdk17-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle clean build --no-daemon

FROM amazoncorretto:17.0.10-alpine
EXPOSE 8080:8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/sanguis.jar
ENTRYPOINT ["java","-jar","/app/sanguis.jar"]