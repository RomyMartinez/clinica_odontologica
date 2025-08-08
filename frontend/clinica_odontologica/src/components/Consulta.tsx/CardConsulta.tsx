import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  MapPin,
  Eye,
} from "lucide-react";

interface CardConsultaProps {
  paciente: string;
  dentista: string;
  data: string;
  status: string;
}

export function CardConsulta({
  paciente,
  dentista,
  data,
  status,
}: CardConsultaProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "AGENDADA":
        return "bg-amber-500";
      case "CONCLUIDA":
        return "bg-emerald-500";
      case "CANCELADA":
        return "bg-rose-500";
      case "REAGENDADA":
        return "bg-orange-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "AGENDADA":
        return <Clock size={14} />;
      case "CONCLUIDA":
        return <CheckCircle size={14} />;
      case "CANCELADA":
        return <XCircle size={14} />;
      case "REAGENDADA":
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDate(data);

  return (
    <div className="group bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all duration-200 hover:shadow-md">
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
            ></div>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {status}
            </span>
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white ${getStatusColor(
              status
            )}`}
          >
            {getStatusIcon(status)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <User size={18} className="text-slate-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">
              {paciente}
            </h3>
            <p className="text-xs text-slate-500">Paciente</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <MapPin size={14} className="text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-500">Dentista</p>
            <p className="text-sm font-semibold text-slate-900">{dentista}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <Calendar size={14} className="text-blue-600" />
            <div>
              <p className="text-xs text-blue-600 font-medium">Data</p>
              <p className="text-sm font-semibold text-slate-900">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
            <Clock size={14} className="text-purple-600" />
            <div>
              <p className="text-xs text-purple-600 font-medium">Horário</p>
              <p className="text-sm font-semibold text-slate-900">{time}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
          <Eye size={16} className="text-slate-500" />
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
