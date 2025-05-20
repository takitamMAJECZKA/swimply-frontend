"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Link } from "react-router-dom"

import { useContext } from "react"
import { DataContext } from "@/components/DataProvider"

export function NavUser({
  user
}) {
  const { isMobile } = useSidebar()
  const { workoutsData, workoutsLoading, accountData, accountLoading } = useContext(DataContext)
  if(workoutsLoading || accountLoading) {
    return (
      <div className="w-full h-10 rounded-lg animate-pulse bg-(--aqua)"></div>
    )
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={accountData.username} />
                <AvatarFallback className="rounded-lg text-(--dominant)">{accountData.username.substring(0,2)[0].toUpperCase()+accountData.username.substring(0,2)[1]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{accountData.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={accountData.username} />
                  <AvatarFallback className="rounded-lg text-(--dominant)">{accountData.username.substring(0,2)[0].toUpperCase()+accountData.username.substring(0,2)[1]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{accountData.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/settings/account">
              <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                <BadgeCheck />
                Konto
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link onClick={()=>{
              localStorage.removeItem('access_token')
              document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
            }} to="/signin">
              <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                <LogOut />
                Wyloguj
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
