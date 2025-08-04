import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarFooter } from "./SidebarFooter";
import { Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { LoadingPage } from "../../pages/LoadingPage";
import { ErrorPage } from "../../pages/ErrorPage";

export function Sidebar() {
  const { isLoading, error, isError } = useUser();

  if (isError) return <ErrorPage error={error} />;

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-row w-full h-screen">
      <aside className="flex flex-col w-72 bg-white border-r border-gray-200">
        <SidebarHeader />
        <SidebarMenu />
        <SidebarFooter />
      </aside>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
