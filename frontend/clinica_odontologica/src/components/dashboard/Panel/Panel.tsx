import { PacientesRecentes } from "./PacientesRecentes";
import { ConsultasHoje } from "./ConsultasHoje";

export function Panel() {
  return (
    <div className="flex flex-row w-full h-full gap-5">
      <ConsultasHoje />
      <PacientesRecentes />
    </div>
  );
}
