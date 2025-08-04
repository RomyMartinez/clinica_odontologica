import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-red-500 rounded-lg p-4 shadow-md">
          <h1 className="text-3xl font-bold text-red-500">
            {error.status} {error.statusText}
          </h1>
          <p>{error.statusText || "Erro desconhecido"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-gray-50 border border-red-500 rounded-lg p-4 shadow-md">
        <h1 className="text-3xl font-bold text-red-500">
          Ops! Algo deu errado
        </h1>
        <p>{(error as Error).message}</p>
      </div>
    </div>
  );
}
