import { z } from "zod";
import { procedure } from "../../trpc.js";
import { gerarUrlAssinada } from "@manager-members/s3";

export default procedure
  .input(
    z.object({
      key: z.string(),
    })
  )
  .query(async (opts): Promise<string> => {
    const { key } = opts.input;
    const url = await gerarUrlAssinada(key, 3600);

    return url;
  });
