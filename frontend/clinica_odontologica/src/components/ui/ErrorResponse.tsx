export function ErrorResponse({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold">
        {error.message || "Erro ao carregar usuários"}
      </h1>
    </div>
  );
}
