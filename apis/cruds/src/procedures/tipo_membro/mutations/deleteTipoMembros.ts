import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient, tipoMembro } from "@manager-members/main-db/src";
import { eq } from "drizzle-orm";

export default procedure.input(z.object({
    id: z.string().nanoid(),
})).mutation(async (opts) => {
    const { id } = opts.input;

    const [resultado] = await dbClient
        .delete(tipoMembro)
        .where(eq(tipoMembro.id, id))
        .returning({
            id: tipoMembro.id,
        });

    return resultado;
})