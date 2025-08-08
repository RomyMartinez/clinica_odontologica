import { CardConsulta } from "./CardConsulta";
import type { Consulta } from "../../interfaces/consulta";
import { SearchBar } from "../ui/SearchBar";
import { useState } from "react";

interface GridConsultaProps {
  consultas: Consulta[];
}

export function GridConsulta({ consultas }: GridConsultaProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      <div className="px-6 py-3">
        <div className="mb-6">
          <SearchBar search={search} setSearch={setSearch} label="consulta" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {consultas.map((consulta) => (
            <CardConsulta
              paciente={consulta.paciente.nome}
              dentista={consulta.dentista.nome}
              data={consulta.dataHora}
              status={consulta.status}
              key={consulta.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
