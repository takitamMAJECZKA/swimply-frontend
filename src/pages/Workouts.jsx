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


import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import FinishedWorkout from "../components/FinishedWorkout"
import EditableWorkout from "../components/EditableWorkout"
import { toast } from "sonner";

export default function Workouts(){
    const [workoutsList, setWorkoutsList] = useState([]);



    useEffect(() =>{
        async function getAccessToken(){
            fetch('http://62.171.167.17:8080/refresh-token',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
                },
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    if(data.code == 428){
                        localStorage.removeItem('refresh_token')
                        window.location.href = '/signin'
                    }else{
                        toast.error(data.error)
                    }
                }else{
                    document.cookie = `access_token:${data.access_token}; path=/`
                }
            })
        }
        console.log(document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/)?.[1]);
        async function getWorkoutsList(){
            fetch('http://62.171.167.17:8080/api/v2/workouts',{
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/)?.[1]}`,
                    'Content-Type': 'application/json'
                }
            }).then(res=>res.json())
            .then(data=>{
                    if(data.error){
                        toast.error(data.error)
                    }else{
                        console.log(JSON.stringify(data))
                        let list = [];
                        data.map((filaElem) => {
                            let workoutData = {
                                id: filaElem.workout.id,
                                name: filaElem.workout.name,
                                workoutDate: filaElem.workout.workoutDate,
                                timeLong: filaElem.workout.timeLong,
                                distance: filaElem.workout.distance,
                                poolLength: filaElem.workout.poolLength,
                                mainType: filaElem.workout.mainType,
                                elementsIn: filaElem.workout.elementsIn,
                            }
                            list.push(workoutData)
                        })
                        setWorkoutsList([...list])
                    }
            })
        }
        getWorkoutsList()
    },[])

    function addWorkoutToList(passedWorkoutData, id){
        passedWorkoutData.id = id? id : uuidv4();
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