# Curriculum Manager

## Setting up the database
Using TSQL:
1. Create the database and schema
2. Create the tables using provided script
3. Create the views using provided script
4. Create the procedures using provided script

## Running application locally
First install NodeJS onto your machine, then:
1. Clone the repo on to your computer
2. In Navigate into the client folder and run npm install to run the dependencies for the client application
3. Navigate into the server folder and do the same thing
4. In the server folder, you must provide an .env file with the following credentials to your database

DB_USERNAME=xxxx
DB_PASS=xxxx
DB_SERVER=xxxx
DB_NAME=xxxxx
DB_PORT=xxxx


5. Once all that is done, navigate into the client folder and run npm run start to start the client
6. At the same, navigate into the server folder and run node index.js to start the server