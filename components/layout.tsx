"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  ChevronDown,
  User,
  MessageSquare,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Code,
  TrendingUp,
} from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header im freelance.de Stil */}
      <header className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-[#7DD5D8] rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-2 font-bold text-gray-800 text-xl">freelance.de</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-800 font-medium">
                  Projekte finden
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-800 font-medium">
                  Freelancer finden
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-800 font-medium">
                  Angebot
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <Link href="/blog" className="text-gray-800 font-medium">
                Blog
              </Link>
            </nav>

            <button className="text-gray-800">
              <Bell className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <span className="hidden md:inline text-gray-800">Valentin</span>
              <Link
                href="/upgrade"
                className="ml-2 bg-[#FFD100] hover:bg-[#EABD00] text-gray-800 px-4 py-1.5 rounded font-medium text-sm"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar im freelance.de Stil */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <Link href="/settings" className="text-[#7DD5D8] text-sm hover:underline">
                Profil bearbeiten
              </Link>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md text-gray-800 ${
                pathname === "/dashboard" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Mein Dashboard</span>
              </div>
            </Link>
            <Link
              href="/rate-increase-tips"
              className={`block px-3 py-2 rounded-md text-gray-800 ${
                pathname === "/rate-increase-tips" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Tipps zur Erhöhung</span>
              </div>
            </Link>
            <Link
              href="/negotiation"
              className={`block px-3 py-2 rounded-md text-gray-800 ${
                pathname === "/negotiation" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Preisverhandlung</span>
              </div>
            </Link>
            <Link
              href="/settings"
              className={`block px-3 py-2 rounded-md text-gray-800 ${
                pathname === "/settings" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Einstellungen</span>
              </div>
            </Link>
            <Link
              href="/help"
              className={`block px-3 py-2 rounded-md text-gray-800 ${
                pathname === "/help" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Hilfe & Support</span>
              </div>
            </Link>
            <Link
              href="/simple-test"
              className={`block px-3 py-2 rounded-md text-gray-800 ${
                pathname === "/simple-test" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>API-Test</span>
              </div>
            </Link>
          </nav>
        </aside>

        {/* Main Content - explizit weiß setzen */}
        <main className="flex-1 bg-white pl-0 pr-6 py-6">{children}</main>
      </div>

      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FinLancer AI | freelance.de
        </div>
      </footer>
    </div>
  )
}
