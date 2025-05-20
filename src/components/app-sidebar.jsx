import * as React from "react"
import {
  BookOpen,
  CircleHelp,
  Settings2,
  Activity,
  Waves,
  Calculator
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Macius",
    avatar: "#",
  },
  navMain: [
    {
      title: "Treningi",
      url: "/workouts",
      icon: Activity,
      isActive: window.location.pathname === "/workouts" ||  window.location.pathname === "/workouts/*" ? true : false,
      items: [
        {
          title: "Dodaj",
          url: "/workouts/add",
        },
        {
          title: "Historia",
          url: "/workouts/history",
        },
      ],
    },
    {
      title: "Szablony",
      url: "/patterns",
      icon: BookOpen,
      isActive: window.location.pathname === "/patterns" ||  window.location.pathname === "/patterns/" ? true : false,
      items: [
        {
          title: "Ćwiczenia",
          url: "/patterns/exercises",
        },
        {
          title: "Treningi",
          url: "/patterns/workouts",
        },
      ],
    },
    {
      title: "Ustawienia",
      url: "/settings",
      icon: Settings2,
      isActive: window.location.pathname === "/settings" ||  window.location.pathname === "/settings/" ? true : false,
      items: [
        {
          title: "Konto",
          url: "/settings/account",
        },
        {
          title: "Twoje dane",
          url: "/settings/yourData",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Częste pytania",
      url: "",
      icon: CircleHelp,
    },
  ],
  projects: [
    {
      name: "Oblicz tempo",
      url: "/tools/paceCalculator",
      icon: Calculator,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <svg className="rounded-lg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="400" height="400" fill="#005792"/>
                    <g transform="translate(200, 200)">
                      <path d="M-150,0 C-100,-30 -50,30 0,0 C50,-30 100,30 150,0" 
                            fill="none" stroke="#ffffff" strokeWidth="24" strokeLinecap="round"/>
                            
                      <path d="M-150,70 C-100,40 -50,100 0,70 C50,40 100,100 150,70" 
                            fill="none" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" opacity="0.7"/>
                            
                      <path d="M-150,-70 C-100,-100 -50,-40 0,-70 C50,-100 100,-40 150,-70" 
                            fill="none" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" opacity="0.7"/>
                    </g>
                  </svg>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Swimply</span>
                  <span className="truncate text-xs">Swimming tracker</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
