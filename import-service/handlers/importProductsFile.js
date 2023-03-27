
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const handler = async (event) => {
  const awsRegion = process.env.BUCKET_REGION;
  const s3Bucket = process.env.BUCKET;
  const { name } = event.queryStringParameters;

  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Required param 'name' is not found" })
    }
  }
  
  const s3Client = new S3Client({ region: awsRegion });
  const uploadedKey = `uploaded/${name}`;
  const putCommand = new PutObjectCommand({ Bucket: s3Bucket, Key: uploadedKey });
  
  try {
    const signedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ url: signedUrl })
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Failure occurred during creation signed url' })
    };
  }
};