import { useState } from "react";
import { useUsers } from "../../hooks/users/useUsers";
import { UserCard } from "./UserCard";
import { UserForm } from "./UserForm";

export function UserSettings() {
  const { data: users, isLoading, isError } = useUsers();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar usuários</div>;

  const usersList = users || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Configurações de usuário</h1>
          <p className="text-sm text-gray-500">
            Veja usuarios ativos e adicione novos.
          </p>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={handleOpen}
          >
            Adicionar usuário
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-lg font-bold">Usuários ativos</h2>
        <ul className="flex flex-col gap-2 w-full">
          {usersList.map((user: any) => (
            <li key={user.id} className="flex flex-row gap-2">
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      </div>
      {open && <UserForm open={open} onClose={handleClose} />}
    </div>
  );
}
