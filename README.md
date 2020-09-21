# local_debug
Setup for local debugging of engines

`npm run prismation` will migrate and generate (if the db does not already contain migrations)

Makefile contains commands to spin up dbs in docker. 
.env file contains env vars to link custom binaries and also the db credentials. 

Notes:
Once migrate reset is done, add this as a command.  
