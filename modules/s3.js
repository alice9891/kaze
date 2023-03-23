/**
 * @author 서동해
 * @email kaze@aivar.kr
 * @create date 2023-03-23 16:44:09
 * @modify date 2023-03-23 16:44:10
 * @desc [description]
 */

import dotenv from 'dotenv';
import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);
dotenv.config();

const region = 'ap-northeast-2';
const bucketName = 'my-fiit-api';
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

export const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
});

export async function generateUploadURL(extension) {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex') + '.' + extension;

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}
