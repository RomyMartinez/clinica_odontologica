import { useUsers } from "../../hooks/useUsers";

export function UserSettings() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar usuários</div>;

  const usersList = users || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Configurações de usuário</h1>
        <p className="text-sm text-gray-500">
          Veja usuarios ativos e adicione novos.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Usuários ativos</h2>
        <div className="flex flex-col gap-2">
          {usersList.map((user: any) => (
            <div key={user.id} className="flex flex-row gap-2">
              <span>{user.name}</span>
              <span>{user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
