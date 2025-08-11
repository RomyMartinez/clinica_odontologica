import { User, Stethoscope } from "lucide-react";
import { Header } from "../components/ui/Header";
import { Button } from "../components/settings/Button";
import { useState } from "react";
import { UserSettings } from "../components/settings/User";
import { DentistaSettings } from "../components/settings/Dentista";

export function Settings() {
  const [activeTab, setActiveTab] = useState("user");
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header title="Settings" />
      <div className="flex flex-col gap-4 w-full p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-sm text-gray-500">
            Aqui você pode configurar as opções da sua conta.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full p-10">
          <div className="flex flex-row gap-6 w-full">
            <div className="flex flex-col gap-3 border-r-2 border-gray-200 w-1/3 pr-6">
              <Button
                title="Configurações de usuário"
                icon={<User />}
                active={activeTab === "user"}
                description="Aqui você pode configurar as opções da sua conta."
                onClick={() => {
                  setActiveTab("user");
                }}
              />
              <Button
                title="Configurações de dentista"
                icon={<Stethoscope />}
                active={activeTab === "dentist"}
                description="Aqui você pode configurar as opções dos dentistas."
                onClick={() => {
                  setActiveTab("dentist");
                }}
              />
            </div>
            <div className="flex flex-col gap-4 w-2/3">
              {activeTab === "user" && <UserSettings />}
              {activeTab === "dentist" && <DentistaSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
