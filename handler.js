'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies


let options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };

const client = new AWS.DynamoDB.DocumentClient(options);

// _____________________________

module.exports.addtask = (event, context, callback) => {
    let newtask = JSON.parse(event.body);
    const params = {
        TableName: "tasksTable",
        Item: {
            id: uuid.v1(),
            taskName: newtask.name,
        },
    };
    client.put(params, (error)=>{
        if (error) {
            console.error(error);
            callback(null, {
              statusCode: error.statusCode || 501,
              headers: { 'Content-Type': 'text/plain' },
              body: JSON.stringify({message:'didnt work out mate'}),
            });
            return;
        }
        let response = {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          body: JSON.stringify({message: params.Item})
        }
        callback(null, response);
      });
}

module.exports.removetask = (event, context, callback) => {
    const params = {
        TableName: "tasksTable",
        Key: {
          id: event.pathParameters.id,
        },
      };
      client.delete(params, (error) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({message:'delleeeted'}),
          });
          return;
        }
        let respones = {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          body: JSON.stringify({message:'removed'})
        }
        callback(null, respones);
      })
}

module.exports.gettasks = (event, context, callback) => {

    const params = {
        TableName: "tasksTable",
      };
    console.log("inisde get tasks ... _èà_çèç_-çè ")
      // fetch todo from the database
    //   scan to fetch all rows, get to fetch a specific row with an id
      client.scan(params, (error, result) => {
        // handle potential errors
        // continue
        console.log("searching .....................")
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todo item.',
          });
          return;
        }
    
        let response = {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            body: JSON.stringify({tasks: result.Items})
        }
        callback(null, response);
      })
    
}

module.exports.sayHi = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({message: "Hello world !"})
  })
}
