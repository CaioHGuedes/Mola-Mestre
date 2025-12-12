"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Target,
  BadgeDollarSignIcon,
  MessageCircleQuestionIcon,
  LogOutIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const menuItems = [
  { icon: LayoutDashboard, name: "Dashboard", href: "/dashboard" },
  { icon: BadgeDollarSignIcon, name: "Seus ativos", href: "/actives" },
  { icon: Target, name: "Metas", href: "/goals" },
  { icon: Globe, name: "News", href: "/news" },
  { icon: MessageCircleQuestionIcon, name: "Quiz", href: "/quiz" },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => axios.post("/api/auth/logout"),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Erro ao fazer logout:", error);
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <aside
      className={`
        relative flex flex-col h-screen text-white 
        transition-all duration-300 ease-in-out z-40
        ${isExpanded ? "w-64" : "w-20"}
        rounded-tr-2xl rounded-br-2xl shadow-[4px_0_10px_rgba(0,0,0,0.1)]
      `}
      style={{ backgroundColor: "#014635" }}
    >
      <button
        onClick={toggleSidebar}
        className={`
          absolute cursor-pointer -right-3 top-9 z-50
          flex items-center justify-center w-7 h-7
          bg-white text-[#014635] 
          rounded-full border-2 border-[#014635] shadow-md
          hover:bg-gray-100 transition-transform duration-200 hover:scale-110
          focus:outline-none
        `}
        aria-label={isExpanded ? "Recolher sidebar" : "Expandir sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      <div className="relative flex items-center justify-center h-24 border-b border-white/10 mx-4 mb-2">
        <div
          className={`
            absolute transition-all duration-300 ease-in-out flex items-center justify-center
            ${
              isExpanded
                ? "opacity-100 scale-100 delay-100"
                : "opacity-0 scale-90 pointer-events-none"
            }
          `}
        >
          <div className="w-46 h-14 relative">
            <Image
              src="/logo2.png"
              alt="Logo Completa"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 160px"
            />
          </div>
        </div>

        <div
          className={`
            absolute transition-all duration-300 ease-in-out flex items-center justify-center
            ${
              !isExpanded
                ? "opacity-100 scale-100 delay-100"
                : "opacity-0 scale-50 pointer-events-none"
            }
          `}
        >
          <div className="w-32 h-32 relative">
            <Image
              src="/dollar_transparent.png"
              alt="Icone Logo"
              fill
              className="object-contain"
              priority
              sizes="40px"
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center h-12 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm"
                    : "hover:bg-white/10 text-emerald-100 hover:text-white"
                }
                /* LÓGICA DE CENTRALIZAÇÃO DO ÍCONE */
                ${isExpanded ? "justify-start pl-4" : "justify-center"}
              `}
            >
              <div className="flex items-center justify-center w-6 h-6 shrink-0">
                <item.icon
                  className={`w-6 h-6 ${
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  }`}
                />
              </div>

              <div
                className={`
                  overflow-hidden whitespace-nowrap transition-all duration-300
                  ${isExpanded ? "w-40 ml-4 opacity-100" : "w-0 ml-0 opacity-0"}
                `}
              >
                <span className="font-medium text-sm tracking-wide">
                  {item.name}
                </span>
              </div>

              {!isExpanded && (
                <div className="absolute left-full ml-5 px-2 py-1 bg-[#013d2e] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-emerald-800">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-4 border-transparent border-r-[#013d2e]"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          className="
            w-full flex items-center justify-center h-12
            bg-[#09e277] hover:bg-[#08c76a] text-white border-none shadow-md
            transition-all duration-300 overflow-hidden
          "
        >
          <LogOutIcon
            className={`
              h-5 w-5 shrink-0 transition-transform duration-300
              ${!isExpanded ? "translate-x-1" : ""} 
            `}
          />

          <div
            className={`
             overflow-hidden whitespace-nowrap transition-all duration-300
             ${isExpanded ? "w-auto ml-2 opacity-100" : "w-0 ml-0 opacity-0"}
          `}
          >
            <span className="font-medium">Sair</span>
          </div>
        </Button>
      </div>
    </aside>
  );
}
