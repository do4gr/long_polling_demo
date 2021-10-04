# local_debug

Setup for local debugging of engines

Relevant commands `npm run`:
- "latest": "npm i prisma@dev && npm i @prisma/client@dev",
- "archive": "mv ./migrations ./migrations_archive",
- "test": "ts-node index.ts",
- "reset": "npx prisma migrate reset --force",
- "start-dbs": "docker-compose up -d"

Makefile contains commands to spin up dbs in docker.
.env file contains env vars to link custom binaries and also the db credentials.
