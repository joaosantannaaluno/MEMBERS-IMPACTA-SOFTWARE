import { router } from "./trpc";
import listTipoMembros from "./procedures/tipo_membro/queries/listTipoMembros";
import getTipoMembros from "./procedures/tipo_membro/queries/getTipoMembros";
import createTipoMembros from "./procedures/tipo_membro/mutations/createTipoMembros";
import deleteTipoMembros from "./procedures/tipo_membro/mutations/deleteTipoMembros";
import updateTipoMembros from "./procedures/tipo_membro/mutations/updateTipoMembros";
import tiposMembroSelectList from "./procedures/lists/tiposMembroSelectList";
import listMembros from "./procedures/membro/queries/listMembros";
import getMembros from "./procedures/membro/queries/getMembros";
import createMembros from "./procedures/membro/mutations/createMembros";
import updateMembros from "./procedures/membro/mutations/updateMembros";
import deleteMembros from "./procedures/membro/mutations/deleteMembros";
import createArquivos from "./procedures/arquivos/createArquivos";
import getSignedUrl from "./procedures/arquivos/getSignedUrl";
import getArquivo from "./procedures/arquivos/queries/getArquivo";
import confirmArquivoUpload from "./procedures/arquivos/confirmArquivoUpload";
import getPreset from "./procedures/presets/queries/getPreset";

export const appRouter = router({
  tipo_membros: router({
    list: listTipoMembros,
    get: getTipoMembros,
    create: createTipoMembros,
    update: updateTipoMembros,
    delete: deleteTipoMembros,
  }),
  lists: router({
    tipos_membro: tiposMembroSelectList,
  }),
  membros: router({
    list: listMembros,
    get: getMembros,
    create: createMembros,
    update: updateMembros,
    delete: deleteMembros,
  }),
  arquivos: router({
    getPutUrl: createArquivos,
    getShowUrl: getSignedUrl,

    // create: createArquivos,
    get: getArquivo,

    confirmFileUpload: confirmArquivoUpload,
  }),
  preset: router({
    get: getPreset,
  }),
});

export type AppRouterType = typeof appRouter;
