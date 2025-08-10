import { CardConsulta } from "./CardConsulta";
import type { Consulta } from "../../interfaces/consulta";
import { SearchBar } from "../ui/SearchBar";
import { useState, useMemo } from "react";

interface GridConsultaProps {
  consultas: Consulta[];
  onOpenDetails: (id: string) => void;
  onCancel: (id: string) => void;
  onConcluir: (id: string) => void;
  onDelete: (id: string) => void;
}

export function GridConsulta({
  consultas,
  onOpenDetails,
  onCancel,
  onConcluir,
  onDelete,
}: GridConsultaProps) {
  const [search, setSearch] = useState("");

  const consultasFiltradas = useMemo(() => {
    if (search === "") {
      return consultas;
    }
    return consultas.filter(
      (consulta) =>
        consulta.paciente.nome.toLowerCase().includes(search.toLowerCase()) ||
        consulta.dentista.nome.toLowerCase().includes(search.toLowerCase()) ||
        consulta.status.toLowerCase().includes(search.toLowerCase()) ||
        consulta.descricao.toLowerCase().includes(search.toLowerCase())
    );
  }, [consultas, search]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      <div className="px-6 py-3">
        <div className="mb-6">
          <SearchBar search={search} setSearch={setSearch} label="consulta" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {consultasFiltradas.map((consulta) => (
            <CardConsulta
              key={consulta.id}
              {...consulta}
              onOpenDetails={onOpenDetails}
              onCancel={onCancel}
              onConcluir={onConcluir}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
