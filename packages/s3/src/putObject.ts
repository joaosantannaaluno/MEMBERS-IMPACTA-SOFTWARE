import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3-client.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const putObject = async ({
  file,
  fileName,
  mimeType,
  size,
  isGetObject,
}: {
  file?: any;
  fileName: string;
  mimeType: string;
  size: number;
  isGetObject?: boolean;
}) => {
  try {
    const buffer = isGetObject ? Buffer.from(file, "base64") : undefined;

    let hoje = new Date();
    hoje.setDate(hoje.getDate() + 7);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${fileName}.${mimeType.split("/")[1]}`,
      ...(isGetObject ? { Body: buffer } : undefined),
      ContentType: mimeType,
      ContentLength: size,
    };

    if (!isGetObject) {
      const client = s3Client();
      const command = new PutObjectCommand(params);
      const url = await getSignedUrl(client, command, {
        expiresIn: 3600,
      });

      return url;
    }

    const command = new PutObjectCommand(params);
    const data = await s3Client().send(command);

    if (data.$metadata.httpStatusCode !== 200) {
      return { error: "Falha ao fazer upload no S3" };
    }

    const getCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: params.Key,
    });

    const signedUrl = await getSignedUrl(s3Client(), getCommand, {
      expiresIn: 3600,
    });

    return { url: signedUrl, key: params.Key };
  } catch (err) {
    console.error("Erro ao enviar o arquivo para o S3", err);
  }
};

export const gerarUrlAssinada = async (key: string, time: number) => {
  const client = s3Client();

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(client, command, { expiresIn: time });
  return url;
};
