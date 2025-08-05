import { Header } from "../components/ui/Header";
import { Welcome } from "../components/dashboard/Welcome";
import { Board } from "../components/dashboard/Board/Board";
import { Panel } from "../components/dashboard/Panel/Panel";

export function Dashboard() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header title="Dashboard" />
      <div className="flex flex-col w-full h-full py-12 px-10 gap-8">
        <Welcome />
        <Board />
        <Panel />
      </div>
    </div>
  );
}
