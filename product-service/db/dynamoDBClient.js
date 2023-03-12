const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-3',
})

const db = new AWS.DynamoDB.DocumentClient();

module.exports = db;
