import { router } from "./trpc";
import listTipoMembros from "./procedures/tipo_membro/queries/listTipoMembros";
import getTipoMembros from "./procedures/tipo_membro/queries/getTipoMembros";
import createTipoMembros from "./procedures/tipo_membro/mutations/createTipoMembros";


export const appRouter = router({
    tipo_membros: {
        list: listTipoMembros,
        create: createTipoMembros,
    }
});


export type AppRouterType = typeof appRouter;
