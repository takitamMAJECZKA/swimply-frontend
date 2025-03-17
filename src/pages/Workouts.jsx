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


import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import FinishedWorkout from "../components/FinishedWorkout"
import EditableWorkout from "../components/EditableWorkout"

export default function Workouts(){
    
    let [workoutsList, setWorkoutsList] = useState([]);

    function addWorkoutToList(passedWorkoutData){
        passedWorkoutData.id = uuidv4();
        setWorkoutsList([...workoutsList, passedWorkoutData])
    }

    function deleteWorkout(workoutId){
        let newWorkoutsList = workoutsList.filter((workout) => {
            return workout.id !== workoutId
        })
        setWorkoutsList(newWorkoutsList)
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
                        <EditableWorkout addWorkoutToList={addWorkoutToList}/>
                    </div>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                        {workoutsList.toReversed().map((workout, index) => {
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