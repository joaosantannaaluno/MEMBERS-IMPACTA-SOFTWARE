import { z } from "zod";
import { procedure } from "../../../trpc";
import { eq } from "drizzle-orm";
import { dbClient, membro } from "@manager-members/main-db/src";
import { gerarUrlAssinada } from "@manager-members/s3";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
    })
  )
  .query(async (opts) => {
    const { id } = opts.input;

    const [resultado] = await dbClient
      .select()
      .from(membro)
      .where(eq(membro.id, id))
      .execute();

    let pic = ""

    if (resultado?.id_foto)
      pic = await gerarUrlAssinada(`${resultado?.id_foto}.png` || "", 3600)

    const resultadoNormalizado = {
      ...resultado,
      foto: pic,
    }

    console.log('resultadoNormalizado', resultadoNormalizado)

    return resultadoNormalizado
  });
