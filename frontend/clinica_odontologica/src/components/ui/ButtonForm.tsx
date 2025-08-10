export function ButtonForm({
  isCancel,
  name,
  ...props
}: {
  isCancel: boolean;
  name: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonStyle = isCancel
    ? "bg-gray-500 hover:bg-gray-600"
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <button
      className={`flex-1 px-6 py-3 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${buttonStyle}`}
      {...props}
    >
      {name}
    </button>
  );
}
