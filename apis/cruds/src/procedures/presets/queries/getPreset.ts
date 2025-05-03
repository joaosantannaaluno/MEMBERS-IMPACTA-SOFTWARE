import { z } from "zod";
import { procedure } from "../../../trpc";
import { selectPreset } from "@manager-members/s3";

export default procedure
  .input(
    z.object({
      presetName: z.string(),
    })
  )
  .query(async (opts) => {
    const { presetName } = opts.input;

    // const permitido = await checkUserPermission(
    //   dbClient,
    //   userId,
    //   idOrganizacao,
    //   {
    //     scope: "organization",
    //     permissions: "admin_ler_pedidos",
    //   }
    // );

    // if (!permitido) {
    //   throw new TRPCError({
    //     code: "FORBIDDEN",
    //     message: "Acesso Negado.",
    //   });
    // }

    return selectPreset(presetName);
  });
