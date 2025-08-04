import { CircleUserRound } from "lucide-react";
import { useUser } from "../../hooks/useUser";
import type { userInterface } from "../../components/interfaces/user";

export function SidebarFooter() {
  const { data: user } = useUser();
  const { username, role } = user as userInterface;
  const formattedUsername =
    username[0].toUpperCase() + username.slice(1).toLowerCase();

  return (
    <footer className="flex flex-row gap-2 p-5 border-t border-gray-200 justify-start items-center">
      <CircleUserRound className="flex items-center justify-center rounded-xl h-10 w-10" />
      <div className="text-left">
        <h2 className="text-lg font-medium text-gray-900">
          {formattedUsername}
        </h2>
        <p className="text-xs text-gray-500">{role.toLowerCase()}</p>
      </div>
    </footer>
  );
}
