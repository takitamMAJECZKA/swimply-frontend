import * as React from "react"
import {
  BookOpen,
  CircleHelp,
  Settings2,
  Activity,
  ChartColumn,
  Waves
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
      isActive: window.location.pathname === "/workouts" ||  window.location.pathname === "/workouts/" ? true : false,
      items: [
        {
          title: "Dodaj",
          url: "/workouts/#add",
        },
        {
          title: "Historia",
          url: "/workouts/#history",
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
          title: "Nowy szablon",
          url: "/patterns/#add",
        },
        {
          title: "Pierwszy szablon",
          url: "/patterns/#last",
        },
        {
          title: "Drugi szablon",
          url: "/patterns/#almost-last",
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
          title: "Ogólne",
          url: "/settings/#general",
        },
        {
          title: "Konta",
          url: "/settings/#account",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Częste pytania",
      url: "#",
      icon: CircleHelp,
    },
  ],
  projects: [
    {
      name: "Ostatni trening",
      url: "/workouts/#last",
      icon: Activity,
    },
    {
      name: "Przedostatni trening",
      url: "/workouts/#almost-last",
      icon: Activity,
    },
    {
      name: "I tak dalej",
      url: "/workouts/#and-so-on",
      icon: Activity,
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
