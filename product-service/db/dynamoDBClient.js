const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-3',
})

const db = new AWS.DynamoDB.DocumentClient()

// class DynamoDBClient {
//   constructor(client) {
//     this.client = client;
//   }


// }

// module.exports = new DynamoDBClient(db)

module.exports = db;
