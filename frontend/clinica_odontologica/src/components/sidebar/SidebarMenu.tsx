import { Link } from "../ui/Link";
import { LayoutDashboard, CalendarDays, Users, Settings } from "lucide-react";

export function SidebarMenu() {
  return (
    <nav className="flex flex-col gap-2 p-5 overflow-y-auto h-full">
      <Link to="/" title="Dashboard" icon={<LayoutDashboard />} />
      <Link to="/pacientes" title="Pacientes" icon={<CalendarDays />} />
      <Link to="/consultas" title="Consultas" icon={<Users />} />
      <Link to="/settings" title="Settings" icon={<Settings />} />
    </nav>
  );
}
