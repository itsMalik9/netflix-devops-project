
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /auth-service

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn package -DskipTests


FROM eclipse-temurin:21-jre

WORKDIR /auth-service

COPY --from=build /auth-service/target/auth-service.jar app.jar

USER 10001

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
