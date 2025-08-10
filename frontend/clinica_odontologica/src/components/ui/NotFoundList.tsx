interface NotFoundListProps {
  title: string;
}

export function NotFoundList({ title }: NotFoundListProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-xl font-medium text-gray-700 mb-2">{title}</p>
      </div>
    </div>
  );
}
