import { Card } from "../ui/Card";
import type { userInterface } from "../../interfaces/user";
import { File, Stethoscope, User, Trash2, Loader2 } from "lucide-react";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";
import { useUser } from "../../hooks/users/useUser";

interface UserCardProps {
  user: userInterface;
}

export function UserCard({ user }: UserCardProps) {
  const { mutate: deleteUser, isPending } = useDeleteUser();
  const { data: userData } = useUser();

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "dentista":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "secretaria":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <User />;
      case "dentista":
        return <Stethoscope />;
      case "secretaria":
        return <File />;
      default:
        return <User />;
    }
  };

  return (
    <Card className="p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 rounded-none w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-6 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {user.username}
            </h3>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <div
            className={`flex flex-row items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
              user.role
            )} flex-shrink-0`}
          >
            <span className="mr-1">{getRoleIcon(user.role)}</span>
            {user.role}
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
          <button
            disabled={
              isPending ||
              userData?.username === user.username ||
              userData?.email === user.email
            }
            onClick={() => {
              deleteUser(user.id);
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Excluir usuário"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}
