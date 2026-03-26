"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  WalletCards,
  ChartNoAxesColumnIncreasing,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  children?: { href: string; label: string }[];
}

const MenuItem = ({ icon, label, id, children }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <li>
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "transform rotate-90"
          )}
        />
      </div>
      {isOpen && children && (
        <ul className="ml-8 mt-2 space-y-1">
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={cn(
                  "block px-4 py-2 rounded-lg hover:bg-accent transition-colors",
                  pathname === child.href && "bg-accent font-medium"
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-background border-r z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <Link href="/dashboard" className="text-2xl font-bold">
              Skorpa
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <MenuItem
                icon={<WalletCards className="w-5 h-5" />}
                label="Carteira"
                id="wallet"
                children={[
                  { href: "/dashboard/carteira/aportes", label: "Aportes" },
                  { href: "/dashboard/carteira/meus-ativos", label: "Meus ativos" },
                ]}
              />
              <MenuItem
                icon={<ChartNoAxesColumnIncreasing className="w-5 h-5" />}
                label="Ações"
                id="assets"
                children={[
                  { href: "/dashboard/acoes/todos", label: "Ações" },
                  { href: "/dashboard/acoes/favoritas", label: "Favoritas" },
                ]}
              />
              <MenuItem
                icon={<FileText className="w-5 h-5" />}
                label="Relatórios"
                id="reports"
                children={[
                  { href: "/dashboard/relatorios/carteira", label: "Carteira" },
                  { href: "/dashboard/relatorios/vendas", label: "Vendas" },
                  { href: "/dashboard/relatorios/aportes", label: "Aportes" },
                  { href: "/dashboard/relatorios/variacao", label: "Variação" },
                  { href: "/dashboard/relatorios/dividendos", label: "Dividendos" },
                ]}
              />
              <MenuItem
                icon={<Settings className="w-5 h-5" />}
                label="Configurações"
                id="settings"
                children={[
                  { href: "/dashboard/config/usuario", label: "Usuário" },
                  { href: "/dashboard/config/atalhos", label: "Atalhos" },
                ]}
              />
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Recolher tudo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
