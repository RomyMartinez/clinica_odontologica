import { useUser } from "../../hooks/users/useUser";
import { formattedUsername } from "../../utils/formattedUsername";

export function Welcome() {
  const { data: user } = useUser();
  const username = formattedUsername(user?.username);

  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-3xl font-bold">Bem vindo! {username}</h1>
      <p className="text-gray-500">
        Este é o seu painel, onde você pode ver suas consultas, pacientes e
        muito mais.
      </p>
    </div>
  );
}
