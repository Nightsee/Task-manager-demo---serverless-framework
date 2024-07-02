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
            task: newtask.name,
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
      client.scan(params, (error, result) => {
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


