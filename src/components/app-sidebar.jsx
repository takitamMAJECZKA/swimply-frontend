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
    email: "macius@example.com",
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
                  <Waves className="size-4" />
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
