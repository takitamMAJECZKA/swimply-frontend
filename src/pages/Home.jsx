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




import { Link } from "react-router-dom"
import AddNewWorkout from "../components/AddNewWorkout"
import Workout from "../components/Workout"
import RadarChartWorkoutsCategory from "../components/charts/RadarChartWorkoutsCategory"
import RadialProgressChart from "../components/charts/RadialProgressChart"
import LongAreaChartWeekStats from "../components/charts/LongAreaChartWeekStats"


export default function Home(){
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
                        <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">
                            Swimply
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Strona główna</BreadcrumbPage>
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