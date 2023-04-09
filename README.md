


# Enterprise-Web-Dev-Coursework

## Coursework for CM4025 Enterprise Web Development Instructions for Running Website
**Setup**
Script tested inside of blank ubuntu docker container running ports 3000 & 5000. copy the script file from the github to root directory of container.

**Script**
Run WebsiteScript.sh (`sudo ./websiteScript.sh`) this will install required software and clone the github.

**After Setup**
create .env inside of the server directory and insert this line

    COOKIE_SECRET=""

inside of the "" input a secure password.

**Run Website**
To run the website you need 3 terminals.
 - in 1 terminal navigate to Enterprise-Web-Dev-Coursework/client then run `npm start` to start the front end
 - in another terminal navigate to Enterprise-Web-Dev-Coursework/server and run `npm run server` to start the server
 - In another terminal run mongo (`mongod --dbpath .`) inside of database folder created by script

**Admin Account**
To create an admin account 
Use this line in mongo terminal

    quotesdb.useraccounts.insert(
    {
        "username": "admin",
        "password": "mVrsenQt'swDtW9D",
        "__v": 0
    }
    )

Login Details for website login
uername: admin
password: mVrsenQt'swDtW9D

**Issues**
If script doesn't work inside of docker run these commands

    apt update
    apt install sudo
    chmod u+x websiteScript.sh
    sed -i -e 's/\r$//' /websiteScript.sh
    sudo ./websiteScript.sh

**Without Script**
Instructions to start server on any machine
Software needed
 - Git
 - Node
 - Mongo

**Basic text instructions if all else fails**
 - Clone github
 - navigate to client folder
 - npm install
 - navigate to server folder
 - `npm install`
 - `npm run` inside of client folder
 - `npm run server` inside of server folder
