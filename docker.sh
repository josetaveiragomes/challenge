#!/bin/bash
docker-compose -p challenge up --build -d
docker exec -w /app -it challenge-app-1 /bin/bash