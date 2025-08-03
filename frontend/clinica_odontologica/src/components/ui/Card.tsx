import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} bg-white text-gray-800 shadow-md rounded-lg`}>
      {children}
    </div>
  );
}
