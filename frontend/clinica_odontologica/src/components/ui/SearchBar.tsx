interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  label: string;
}

export function SearchBar({ search, setSearch, label }: SearchBarProps) {
  return (
    <div className="flex flex-row gap-2 w-1/4">
      <input
        className="px-4 py-2 rounded-md border border-gray-300 bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        type="text"
        placeholder={`Pesquisar ${label}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
