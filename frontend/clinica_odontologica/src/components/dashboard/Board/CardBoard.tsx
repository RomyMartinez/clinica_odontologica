import type React from "react";
import { Card } from "../../ui/Card";

interface CardBoardProps {
  title: string;
  content: number;
  icon: React.ReactNode;
  color: string;
}

export function CardBoard({ title, content, color, icon }: CardBoardProps) {
  return (
    <Card className="flex flex-col gap-2 w-72 px-5 py-6 shadow-sm rounded-xl">
      <h1 className="text-md text-gray-700 ">{title}</h1>
      <div className="flex flex-row gap-10 items-center justify-between">
        <p className="text-2xl font-bold text-gray-900">{content}</p>
        <div className={`rounded-full ${color}`}>{icon}</div>
      </div>
    </Card>
  );
}
