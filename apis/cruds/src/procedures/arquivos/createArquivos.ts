import { z } from "zod";
import { procedure } from "../../trpc.js";
import { putObject, validatePreset } from "@manager-members/s3";
import { dbClient } from "@manager-members/main-db";
import saveFile from "@manager-members/s3/dist/saveFile.js";

export default procedure
  .input(
    z.object({
      presetName: z.string(),
      mimeType: z.enum([
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/bmp",
        "image/tiff",
        "image/heif",
        "image/heic",
        "application/pdf",
      ]),
      size: z.number(),
      name: z.string(),
    })
  )
  .mutation(async (opts) => {
    const { mimeType, size, name, presetName } = opts.input;

    let fileDb: { id: string; mime_type: string } = { id: "", mime_type: "" };

    try {
      await validatePreset({
        mimeType,
        size,
        presetName,
      });

      // await validatePreset(presetName, mimeType, size, {
      //   userId,
      //   idOrganizacao,
      // });
    } catch (err: any) {
      throw new Error(err);
    }

    try {
      fileDb = await saveFile({
        dbClient: dbClient,
        bucket: process.env.BUCKET_NAME || "",
        file_name: name,
        size: size,
        mime_type: mimeType,
      });
    } catch (err) {
      console.log("savFile error", err);
    }
    try {
      const url = await putObject({
        mimeType: mimeType,
        fileName: fileDb["id"],
        size: size,
      });

      if (url) {
        // console.log(url);
        return { url: url, id: fileDb?.id, mime_type: fileDb?.mime_type };
      }
    } catch (err) {
      console.log("putObject error");
    }

    return { id: "", url: "", mime_type: "" };
  });
