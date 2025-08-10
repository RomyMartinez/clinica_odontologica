interface ButtonCardProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

export function ButtonCard({
  icon,
  label,
  onClick,
  className,
}: ButtonCardProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2 py-2 px-3 ${className} text-sm font-medium rounded-lg transition-colors`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
