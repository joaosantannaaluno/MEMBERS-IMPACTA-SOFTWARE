import { router } from "./trpc";
import listTipoMembros from "./procedures/tipo_cracha/queries/listTipoCracha";

export const appRouter = router({
  tipo_membros: router({
    list: listTipoMembros,
  }),
});

export type AppRouterType = typeof appRouter;
