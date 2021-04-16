# local_debug

Setup for local debugging of engines

`npm run prismation` will migrate and generate (if the db does not already contain migrations)

Makefile contains commands to spin up dbs in docker.
.env file contains env vars to link custom binaries and also the db credentials.

Notes:
Once migrate reset is done, add this as a command.

<!-- Todo -->

//archive migrations folder, same logic as below

// create a migration and backup its datamodel in the mig folder
// name it automatically in increasing order
// check the ./migrations folder
// get all folder names after _
// if there is none $name=a
// if there are some $name= highest + 1 char
// name migration $name
// after migration is done find folder ending in _$name
// cp schema.prisma to that folder
