import { Hospital } from "lucide-react";
import { Card } from "../components/ui/Card";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: loginMutation, isPending, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation(
      { username, password },
      {
        onSuccess: (data) => {
          login(data.access_token);
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl shadow-lg">
              <Hospital className="w-7 h-7 text-blue-50" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">DentalCare</h1>
              <p className="text-sm text-gray-600">Clinic Management</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        <Card className="mt-8 flex flex-col items-center justify-center p-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h2>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="senha"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">
                  Usuário ou senha inválidos
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                {isPending ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400 mt-2">
            © 2024 DentalCare. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
