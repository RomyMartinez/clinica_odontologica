export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <svg
        className="animate-spin -ml-1 mr-3 h-14 w-14 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading spinner"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p className="mt-4 text-blue-700 text-lg font-semibold">
        Carregando, por favor aguarde...
      </p>
    </div>
  );
}
