import { z } from "zod";
import { procedure } from "../../../trpc.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { arquivos, dbClient } from "@manager-members/main-db";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
    })
  )
  .query(async (opts) => {
    const { id } = opts.input;

    const resultado = await dbClient.query.arquivos.findFirst({
      where: eq(arquivos.id, id),
      columns: {
        id: true,
        bucket: true,
        file_name: true,
        mime_type: true,
        size: true,
        status: true,
        created_at: true,
        created_by: true,
        updated_at: true,
        updated_by: true,
      },
    });

    return resultado;
  });
