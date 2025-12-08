"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Target,
  BadgeDollarSignIcon,
  MessageCircleQuestionIcon,
  LogOutIcon,
} from "lucide-react";
import { motion } from "framer-motion";
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
  const sidebarRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = () => setIsExpanded(true);

  return (
    <aside
      ref={sidebarRef}
      className={`
        relative flex flex-col h-screen text-white transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64" : "w-20"}
        rounded-tr-2xl rounded-br-2xl shadow-lg
      `}
      style={{ backgroundColor: "#014635" }}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-500/30">
        {isExpanded ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xl font-bold"
          >
            <Image src="/logo2.png" width={150} height={150} alt="Logo" />
          </motion.span>
        ) : (
          <Image
            src="/dollar_transparent.png"
            width={500}
            height={500}
            alt="Logo"
          />
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleItemClick}
              className={`
                flex items-center p-3 rounded-lg transition-colors duration-200
                ${isActive ? "bg-white/20" : "hover:bg-white/10"}
              `}
            >
              <item.icon className="h-6 w-6 flex-shrink-0" />
              <span
                className={`
                  ml-4 font-medium transition-opacity duration-200
                  ${isExpanded ? "opacity-100" : "opacity-0"}
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-500/30">
        <div className="p-4 border-t border-gray-500/30">
          <Button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 w-full bg-[#09e277] hover:bg-[#08c76a] text-white"
          >
            <LogOutIcon className="h-5 w-5" />
            {isExpanded && <span>Sair</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
