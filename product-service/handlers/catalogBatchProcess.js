
const { v4: uuidv4 } = require('uuid');
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const productsRepository = require('../repositories/productsRepository');

module.exports.handler = async (event) => {
  const snsRegion = process.env.SNS_REGION;
  const snsTopicArn = process.env.SNS_TOPIC_ARN;
  
  const snsClient = new SNSClient({ region: snsRegion });
  try {
    for (const record of event.Records) {
      const productData = JSON.parse(record.body);
      for (product of productData) {
        await productsRepository.createProduct({
          id: uuidv4(),
          ...product
        });
      }
      const snsPublishCommand = new PublishCommand({
        TopicArn: snsTopicArn,
        Subject: 'ProductDB updated',
        Message: JSON.stringify(productData),
      });
      await snsClient.send(snsPublishCommand);
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Create product failure', error: JSON.stringify(error)})
    };
  }
};
