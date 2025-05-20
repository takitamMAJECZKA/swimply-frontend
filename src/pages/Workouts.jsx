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

import { useEffect, useState,useContext } from "react";

import FinishedWorkout from "../components/FinishedWorkout"
import EditableWorkout from "../components/EditableWorkout"


import { DataContext } from "../components/DataProvider";

import { getAccessToken } from "../getAccessToken.js";
import { toast } from "sonner";
export default function Workouts(){
    const [workoutsList, setWorkoutsList] = useState([]);

    const { workoutsData , workoutsLoading, accountData, accountLoading, refreshData } = useContext(DataContext);

    useEffect(() =>{
        if(workoutsData){
            setWorkoutsList(workoutsData)
        }
    },[workoutsData])

    function deleteWorkout(workoutId){
        let newWorkoutsList = workoutsList.filter((workout) => {
            return workout.id !== workoutId
        })
        setWorkoutsList(newWorkoutsList)
        fetch(`http://62.171.167.17:8080/api/v2/workout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(
                {id: workoutId}
            ),
        }).then((res) => {
            if (res.status === 428) {
                getAccessToken();
                return handleWorkoutNameChange(e);
            }
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        toast.success('Trening usunięty')
        refreshData()
    }

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
                            <BreadcrumbPage>Treningi</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="w-full flex justify-center">
                            <EditableWorkout/>
                        </div>
                        <div id="history" className="grid auto-rows-min gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                            <Skeleton className='w-auto h-[300px]'></Skeleton>
                            <Skeleton className='w-auto h-[300px]'></Skeleton>
                            <Skeleton className='w-auto h-[300px]'></Skeleton>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
        )
    }

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
                        <BreadcrumbPage>Treningi</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="w-full flex justify-center">
                        <EditableWorkout/>
                    </div>
                    <div id="history" className="grid auto-rows-min gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                        {workoutsList?.toReversed().map((workout) => {
                            return(
                                <FinishedWorkout key={workout.id} data={workout} deleteWorkout={deleteWorkout}/>
                            )
                        })}
                    </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>
      )
}