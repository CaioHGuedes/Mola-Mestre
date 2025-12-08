import { ReactNode } from "react";

interface QuizLevelCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
  color: string;
  onClick: () => void;
}

export function QuizLevelCard({
  title,
  icon,
  desc,
  color,
  onClick,
}: QuizLevelCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${color} group flex flex-col items-center text-center h-full justify-center`}
    >
      <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
