import { Header } from "../components/ui/Header";
import { AddBar } from "../components/ui/AddBar";

export function Pacientes() {
  return (
    <div>
      <Header title="Pacientes" />
      <AddBar
        title="Maneje seus pacientes"
        buttonLabel="Adicionar Paciente"
        onClick={() => {}}
      />
    </div>
  );
}
