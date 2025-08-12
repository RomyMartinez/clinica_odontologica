import { useDentistas } from "../../hooks/dentista/useDentistas";
import { DentistaCard } from "./DentistaCard";
import { useState } from "react";
import { DentistaForm } from "./DentistaForm";
import { DentistaDetails } from "./DentistaDetails";
import { ErrorResponse } from "../ui/ErrorResponse";

export function DentistaSettings() {
  const { data: dentistas, isLoading, isError, error } = useDentistas();
  const [isOpenDetails, setIsOpenDetails] = useState({
    isOpen: false,
    id: "",
  });
  const [open, setOpen] = useState(false);
  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <ErrorResponse error={error} />;

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpenDetails(id: string) {
    setIsOpenDetails({ isOpen: true, id });
  }

  function handleCloseDetails() {
    setIsOpenDetails({ isOpen: false, id: "" });
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Configurações de dentista</h1>
          <p className="text-sm text-gray-500">
            Veja dentistas ativos e adicione novos.
          </p>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={handleOpen}
          >
            Adicionar dentista
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-lg font-bold">Dentistas</h2>
        <ul className="flex flex-col gap-2 w-full">
          {dentistas.map((dentista: any) => (
            <li key={dentista.id} className="flex flex-row gap-2">
              <DentistaCard
                dentista={dentista}
                onOpenDetails={handleOpenDetails}
              />
            </li>
          ))}
        </ul>
      </div>
      {open && <DentistaForm open={open} onClose={handleClose} />}
      {isOpenDetails.isOpen && (
        <DentistaDetails
          isOpen={isOpenDetails.isOpen}
          id={isOpenDetails.id}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}
