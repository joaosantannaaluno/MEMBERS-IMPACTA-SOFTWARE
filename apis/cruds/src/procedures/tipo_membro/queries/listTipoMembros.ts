import { z } from "zod";
import { procedure } from "../../../trpc";

export default procedure.query(async (opts) => {
  //   const { id } = opts.input;
  const resultado: {
    id: string;
    descricao: string;
    observacao: string;
    created_at: string;
    created_by: string;
  }[] = [];
  return resultado;
});
