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

import AddNewWorkout from "../components/AddNewWorkout"
import RadarChartWorkoutsCategory from "../components/charts/RadarChartWorkoutsCategory"
import RadialProgressChart from "../components/charts/RadialProgressChart"
import LongAreaChartWeekStats from "../components/charts/LongAreaChartWeekStats"

import { useContext } from "react"
import { DataContext } from "../components/DataProvider"

export default function Home(){

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
                        </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <Skeleton className='w-auto h-[400px]'></Skeleton>
                            <Skeleton className='w-auto h-[400px]'></Skeleton>
                            <Skeleton className='w-auto h-[400px]'></Skeleton>
                    </div>
                    <div className="w-full"> 
                            <Skeleton className='w-auto h-[400px]'></Skeleton>
                    </div>
                </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
        )
    }

    return(
    <div id="homePage">
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbPage>Swimply</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <AddNewWorkout/>
                        <RadarChartWorkoutsCategory />
                        <RadialProgressChart />
                    </div>
                    <div className="w-full"> 
                        <LongAreaChartWeekStats />
                    </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
    </div>
    )
}