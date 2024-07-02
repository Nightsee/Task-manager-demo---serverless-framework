
# task manager app using Serverless framework locally




## Run Locally

Clone the project

```bash
  git clone https://github.com/Nightsee/Task-manager-demo---serverless-framework.git
```

Go to the project directory

```bash
  cd ./Task manager demo - serverless framework/
```

Install dependencies

```bash
  npm install
```

Create s3 folder

```bash
  touch s3 // "New-Item -ItemType Directory s3" for powershell
```
##

 ! - Update the accessKeyId and secretAccessKey to SECRET in: 

./node_modules/serverless-dynamodb-local/index.js

##

Start the server

```bash
  npm start
```

browse to

```
  http://localhost:4569/local-bucket/index.html
```
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## Plugins

- serverless-offline
- serverless-s3-local
- serverless-s3-sync
- serverless-dynamodb-local

