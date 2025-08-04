import { Hospital } from "lucide-react";

export function SidebarHeader() {
  return (
    <div className="flex flex-row gap-2 p-5 border-b border-gray-200 justify-center items-center">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl shadow-lg">
        <Hospital className="w-7 h-7 text-blue-50" />
      </div>
      <div className="text-left">
        <h1 className="text-2xl font-bold text-gray-900">DentalCare</h1>
        <p className="text-sm text-gray-600">Clinic Management</p>
      </div>
    </div>
  );
}
