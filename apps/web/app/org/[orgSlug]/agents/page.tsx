export default async function AgentsPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agentes</h1>
        <p className="text-muted-foreground">
          Organização: {orgSlug}
        </p>
      </div>

      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          Lista de agentes será implementada aqui
        </p>
      </div>
    </div>
  );
}
