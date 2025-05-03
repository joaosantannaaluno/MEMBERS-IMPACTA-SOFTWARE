import { arquivos, createDrizzleClient } from "@manager-members/main-db";

export default async function saveFile(props: {
  dbClient: Awaited<ReturnType<typeof createDrizzleClient>>;
  bucket: string;
  size: number;
  file_name: string;
  mime_type: string;
  // userId: string;
}): Promise<{ id: string; mime_type: string }> {
  const { bucket, file_name, size, mime_type, dbClient } = props;

  const [arquivo] = await dbClient
    .insert(arquivos)
    .values({
      bucket,
      file_name,
      mime_type,
      size,
      status: "pendente",
      created_at: new Date(),
      created_by: "admin",
    })
    .returning({ id: arquivos.id, mime_type: arquivos.mime_type })
    .execute();

  if (!arquivo?.id) throw new Error("Erro ao gerar arquivo");
  return { id: arquivo.id, mime_type: arquivo.mime_type };
}
