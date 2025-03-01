import { z } from "zod";
import { procedure } from "../../../trpc";

export default procedure
  .input(
    z.object({
      descricao: z.string(),
      observacao: z.string(),
    })
  )
  .mutation(async (opts) => {
    const { descricao, observacao } = opts.input;
    return { descricao, observacao };
  });
