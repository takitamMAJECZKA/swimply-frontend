import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {EqualApproximately} from 'lucide-react'


import { Link } from "react-router-dom";
import { toast } from "sonner";

export function NavProjects({
  projects
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Narzędzia</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">Więcej</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}>
                <DropdownMenuItem onClick={() => {window.location.replace(item.url)}}>
                  <EqualApproximately className="text-muted-foreground" />
                  <span>Oblicz</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {toast.error('Zespół swimply wciąż pracuje nad tą funkcją...')}}>
                  <Share className="text-muted-foreground" />
                  <span>Udostępnij</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {toast.error('Zespół swimply wciąż pracuje nad tą funkcją...')}}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Nie pokazuj</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="cursor-pointer" onClick={() => {toast.error('Zespół swimply wciąż pracuje nad innymi narzędziami...')}}>
            <MoreHorizontal />
            <span>Więcej</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
