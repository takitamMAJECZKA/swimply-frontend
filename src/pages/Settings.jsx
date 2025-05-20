import AccountInfo from "@/components/AccountInfo"
import AccountData from "@/components/AccountData"


import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AccountStats from "@/components/AccountStats"

import { Skeleton } from "@/components/ui/skeleton"

import { useContext } from "react"
import { DataContext } from "@/components/DataProvider"

export default function Settings(){
    const { workoutsData, workoutsLoading, accountData, accountLoading } = useContext(DataContext)
    
    if (workoutsLoading || accountLoading) {
        return (
            <div className="workoutsPage">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/">
                                Swimply
                            </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Ustawienia</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <Skeleton className='w-auto h-[250px]'></Skeleton>
                        <Skeleton className='w-auto h-[300px]'></Skeleton>
                        <Skeleton className='w-auto h-[150px]'></Skeleton>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
        )
    }
    
    return (
        <div className="statsPage">
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">
                            Swimply
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Ustawienia</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <AccountInfo />
                    <AccountData />
                    <AccountStats />
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>
      )
}