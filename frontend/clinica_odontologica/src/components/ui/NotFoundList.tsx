interface NotFoundListProps {
  title: string;
  icon: React.ReactNode;
  classname?: string;
}

export function NotFoundList({ title, icon, classname }: NotFoundListProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
      <div
        className={`w-24 h-24 rounded-full flex items-center justify-center ${classname}`}
      >
        {icon}
      </div>
      <div className="text-center">
        <p className="text-xl font-medium text-gray-700 mb-2">{title}</p>
      </div>
    </div>
  );
}
