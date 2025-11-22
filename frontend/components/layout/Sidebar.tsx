"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Users, TrendingUp, Settings, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Números", href: "/numbers", icon: MessageSquare },
  { name: "Conversas", href: "/conversations", icon: MessageSquare },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "ROI", href: "/roi", icon: TrendingUp },
  { name: "Configurações", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-black/50 border-r border-[#FF4500]/30 min-h-screen p-6">
      <div className="flex items-center space-x-2 mb-8">
        <Zap className="w-8 h-8 text-[#FF4500]" />
        <h1 className="text-xl font-bold cyberpunk-glow text-[#FF4500]">
          M13X LEADS
        </h1>
      </div>
      
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-[#FF4500]/20 text-[#FF4500] border border-[#FF4500]"
                  : "text-gray-400 hover:bg-black/30 hover:text-[#FF4500]"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

