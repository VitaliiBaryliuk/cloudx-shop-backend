import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import csv from 'csv-parser';

export const handler = async (event, context) => {
  const awsRegion = process.env.BUCKET_REGION;
  const queueUrl = process.env.QUEUE_URL
  const s3Bucket = process.env.BUCKET;

  const s3Client = new S3Client({ region: awsRegion });
  const sqsClient = new SQSClient({ region: awsRegion })
  try {
    for await (const record of event.Records) {
      const getObjectCommand = new GetObjectCommand({ 
        Bucket: s3Bucket,
        Key: record.s3.object.key 
      });
      
      const response = await s3Client.send(getObjectCommand);
      const productsData = await new Promise((resolve, reject) => {
        const resultData = [];
        response.Body
          .pipe(csv())
          .on('data', (data) => {
            resultData.push(data);
          })
          .on('end', () => {
            console.log('csv parsed successfully', resultData);
            resolve(resultData)
          })
          .on('error', (err) => {
            reject(err);
          });
      });
      const sendMessage = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(productsData),
      }); 
      await sqsClient.send(sendMessage);
      return {
        statusCode: 200,
      };
    }
  } catch (error) {
    console.log('ERROR', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Failure occurred during processing data' })
    };
  }
};
