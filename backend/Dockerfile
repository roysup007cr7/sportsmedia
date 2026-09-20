# Build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q clean package -DskipTests

# Run
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/sportsmedia-1.0.0.jar app.jar
# Render and Railway inject PORT; Spring reads it here.
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT} -jar app.jar"]
