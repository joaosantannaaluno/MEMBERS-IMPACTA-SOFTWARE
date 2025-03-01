import { router } from "./trpc";
import listTipoMembros from "./procedures/tipo_membro/queries/listTipoMembros";
import getTipoMembros from "./procedures/tipo_membro/queries/getTipoMembros";
import createTipoMembros from "./procedures/tipo_membro/mutations/createTipoMembros";
import deleteTipoMembros from "./procedures/tipo_membro/mutations/deleteTipoMembros";
import updateTipoMembros from "./procedures/tipo_membro/mutations/updateTipoMembros";

export const appRouter = router({
  tipo_membros: router({
    list: listTipoMembros,
    get: getTipoMembros,
    create: createTipoMembros,
    update: updateTipoMembros,
    delete: deleteTipoMembros,
  }),
});

export type AppRouterType = typeof appRouter;
