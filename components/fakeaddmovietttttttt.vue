version: '3.8'

services:
backend:
build:
context: .
dockerfile: Dockerfile
restart: always
ports:
- "4000:4000"
environment:
GO_ENV: production
HASURA_GRAPHQL_DATABASE_URL: ${HASURA_GRAPHQL_DATABASE_URL} # or connect directly to postgres
depends_on:
- postgres
- graphql-engine
networks:
- my_networks

postgres:
image: postgres:15
restart: always
volumes:
- db_data:/var/lib/postgresql/data
environment:
DB_PASSWORD: ${DB_PASSWORD}
networks:
- my_networks

graphql-engine:
image: hasura/graphql-engine:v2.42.0
ports:
- "8080:8080"
restart: always
environment:
HASURA_GRAPHQL_METADATA_DATABASE_URL: ${HASURA_GRAPHQL_METADATA_DATABASE_URL}
HASURA_GRAPHQL_DATABASE_URL: ${HASURA_GRAPHQL_DATABASE_URL}
HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
HASURA_GRAPHQL_ADMIN_SECRET: ${HASURA_GRAPHQL_ADMIN_SECRET}
HASURA_GRAPHQL_DEV_MODE: "true"
HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
HASURA_GRAPHQL_JWT_SECRET: ${HASURA_GRAPHQL_JWT_SECRET}
HASURA_GRAPHQL_UNAUTHORIZED_ROLE: "anonymous"
HASURA_GRAPHQL_ENABLE_TELEMETRY: "false"
depends_on:
- postgres
networks:
- my_networks


volumes:
db_data:
networks:
my_networks:
driver: bridge