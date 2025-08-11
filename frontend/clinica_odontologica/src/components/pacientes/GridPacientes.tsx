import type { Paciente } from "../../interfaces/paciente";
import { Grid } from "../ui/Grid";
import { SearchBar } from "../ui/SearchBar";
import { useState } from "react";
import { PacienteCard } from "./PacienteCard";
import { NotFoundList } from "../ui/NotFoundList";
import { User } from "lucide-react";

interface GridPacientesProps {
  pacientes: Paciente[];
  onOpenDetails: (cpf: string) => void;
}

export function GridPacientes({
  pacientes,
  onOpenDetails,
}: GridPacientesProps) {
  const [search, setSearch] = useState("");

  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      paciente.nome.toLowerCase().includes(search.toLowerCase()) ||
      paciente.cpf.toLowerCase().includes(search.toLowerCase()) ||
      paciente.email.toLowerCase().includes(search.toLowerCase()) ||
      paciente.telefone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col p-6 gap-10">
      <SearchBar search={search} setSearch={setSearch} label="paciente" />
      {pacientesFiltrados.length > 0 ? (
        <Grid>
          {pacientesFiltrados.map((paciente) => (
            <PacienteCard
              key={paciente.id}
              paciente={paciente}
              onOpenDetails={() => onOpenDetails(paciente.cpf)}
            />
          ))}
        </Grid>
      ) : (
        <NotFoundList
          title="Nenhum paciente encontrado"
          icon={<User size={48} />}
          classname="bg-green-100 text-green-500"
        />
      )}
    </div>
  );
}
