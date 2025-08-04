import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string;
  title: string;
  icon: React.ReactNode;
  [key: string]: any;
}

export function Link({ to, title, icon, ...props }: LinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-row py-3 px-4 rounded-lg items-center gap-2 text-sm ${
          isActive
            ? "text-white bg-blue-500"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
      {...props}
    >
      {icon}
      <span className="text-md font-medium">{title}</span>
    </NavLink>
  );
}
