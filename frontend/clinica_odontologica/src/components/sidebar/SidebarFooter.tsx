import { CircleUserRound } from "lucide-react";
import { useUser } from "../../hooks/useUser";
import type { userInterface } from "../../interfaces/user";
import { formattedUsername } from "../../utils/formattedUsername";
import { useAuth } from "../../contexts/AuthContext";

export function SidebarFooter() {
  const { data: user } = useUser();
  const { logout } = useAuth();
  const { username, role } = user as userInterface;
  const user_name = formattedUsername(username);

  return (
    <footer className="flex flex-row border-t border-gray-200 gap-10 items-center p-5">
      <div className="flex flex-row gap-2 justify-start items-center">
        <CircleUserRound className="flex items-center justify-center rounded-xl h-10 w-10" />
        <div className="text-left">
          <h2 className="text-lg font-medium text-gray-900">{user_name}</h2>
          <p className="text-xs text-gray-500">{role.toLowerCase()}</p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white rounded-md h-min border-2 w-min px-4 py-2 hover:border-2 hover:text-blue-500 hover:bg-white"
        onClick={logout}
      >
        Logout
      </button>
    </footer>
  );
}
