import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivateRoute } from "./routes/PrivateRoutes";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Pacientes } from "./pages/Pacientes";
import { Consultas } from "./pages/Consultas";
import { Settings } from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute page={<Dashboard />} />} />
            <Route
              path="/pacientes"
              element={<PrivateRoute page={<Pacientes />} />}
            />
            <Route
              path="/consultas"
              element={<PrivateRoute page={<Consultas />} />}
            />
            <Route
              path="/settings"
              element={<PrivateRoute page={<Settings />} />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
