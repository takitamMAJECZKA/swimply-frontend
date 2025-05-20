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

import { Skeleton } from "@/components/ui/skeleton"
import { useContext } from "react"
import { DataContext } from "@/components/DataProvider"

import SwimPaceCalculator from "@/components/SwimCalculatePace"

export default function PaceCalculator(){
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
                            <BreadcrumbPage>Oblicz Tempo</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="w-full flex justify-center">
                            <Skeleton className='w-full h-full'></Skeleton>
                        </div>
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
                        <BreadcrumbPage>Oblicz Tempo</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                </header>
                <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                    <SwimPaceCalculator />
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>
      )
}