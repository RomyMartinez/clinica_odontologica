import type { Paciente } from "./paciente";
import type { Dentista } from "./dentista";

export interface Consulta {
  id: string;
  dataHora: string;
  descricao: string;
  status: "AGENDADA" | "CANCELADA" | "CONCLUIDA" | "REAGENDADA";
  patientId: string;
  dentistId: string;
  paciente: Paciente;
  dentista: Dentista;
  createdAt: string;
}

export interface CreateConsulta {
  dataHora: string;
  descricao: string;
  pacienteId: string;
  dentistaId: string;
}
