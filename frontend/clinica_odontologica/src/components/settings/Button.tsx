interface ButtonProps {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  description: string;
  onClick: () => void;
}

export function Button({
  title,
  icon,
  active,
  description,
  onClick,
}: ButtonProps) {
  let buttonClass =
    "flex flex-row gap-3 w-full p-4 rounded-lg border transition-all duration-200 hover:shadow-md";
  let descriptionClass = "text-xs text-gray-500";
  let iconClass = "text-gray-500";

  if (active) {
    buttonClass += " bg-blue-500 text-white border-blue-500";
    descriptionClass = "text-xs text-blue-100";
    iconClass = "text-white";
  } else {
    buttonClass +=
      " bg-white text-gray-900 border-gray-200 hover:border-gray-300";
    descriptionClass = "text-xs text-gray-500";
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      <div className={`flex items-center justify-center ${iconClass}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1 text-left w-full">
        <span className="text-sm font-medium">{title}</span>
        <span className={descriptionClass}>{description}</span>
      </div>
    </button>
  );
}
