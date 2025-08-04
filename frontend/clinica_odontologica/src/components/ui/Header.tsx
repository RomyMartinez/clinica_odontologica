export function Header({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-bold text-center p-5 text-gray-900 border-b border-gray-200 w-full bg-white">
      {title}
    </h1>
  );
}
