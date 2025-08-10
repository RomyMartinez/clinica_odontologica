export function getStatusColor(
  status: "AGENDADA" | "CONCLUIDA" | "CANCELADA" | "REAGENDADA"
) {
  const statusColor = {
    AGENDADA: "bg-amber-500 text-white",
    CONCLUIDA: "bg-emerald-500 text-white",
    CANCELADA: "bg-rose-500 text-white",
    REAGENDADA: "bg-orange-500 text-white",
  };

  return statusColor[status];
}
