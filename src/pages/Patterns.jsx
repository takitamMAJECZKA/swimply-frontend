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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"  

import ExercisePattern from "@/components/ExercisePattern"
import EditableWorkout from "../components/EditableWorkout"
import WorkoutPattern from "../components/WorkoutPattern"

import { v4 as uuidv4 } from 'uuid'

import { useRef } from "react"

const exercisePatterns = [
    {name: 'Żabka'},
    {name: 'Kraul'},
    {name: 'Motylek'},
    {name: 'Grzbiet'},
    {name: 'Żabka ratownicza'},
    {name: 'Kraul ratowniczy'},]

const workoutPatterns = [
    {name: 'Każdy styl', content: [{id: uuidv4(), name: 'Żabka', time: '00:00', type:"exercise", distance: 0},{id: uuidv4(), type:"break", time:'02:00'}, {id: uuidv4(), name: 'Kraul',type:"exercise", time: '00:00', distance: 0}, {id: uuidv4(), type:"break", time:'02:00'}, {id: uuidv4(), name: 'Motylek', type:"exercise", time: '00:00', distance: 0}, {id: uuidv4(), type:"break", time:'02:00'}, {id: uuidv4(), name: 'Grzbiet', type:"exercise", time: '00:00', distance: 0}, {id: uuidv4(), type:"break", time:'02:00'}, {id: uuidv4(), name: 'Żabka ratownicza', type:"exercise", time: '00:00', distance: 0}, {id: uuidv4(), type:"break", time:'02:00'}, {id: uuidv4(), name: 'Kraul ratowniczy', type:"exercise", time: '00:00', distance: 0}]},

    {name: 'Otyliada', content: [{id: uuidv4(), name: 'Kraul', time: '60:00', type:"exercise", distance: 0}, {id: uuidv4(), name: 'Kraul',type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0},{id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}, {id: uuidv4(), name: 'Kraul', type:"exercise", time: '60:00', distance: 0}]},
]

export default function Patterns(){
    const carouselPlugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true }))
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
                        <BreadcrumbPage>Szablony</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                </header>
                <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                    <div className="w-full flex justify-center items-center md:min-h-min">
                    <Sheet>
                        <SheetTrigger><div className="p-4 bg-[var(--dominant)] rounded-md text-2xl font-bold border-[2px] border-(--aqua) fancy-shadow m-3 cursor-pointer">Aktualny trening</div></SheetTrigger>
                        <SheetContent className="w-auto max-h-screen overflow-x-auto rounded-tl-sm rounded-bl-sm">
                            <SheetHeader className="p-2">
                            <SheetTitle>Trening</SheetTitle>
                            <SheetDescription>
                                Tworzysz sobie trening
                            </SheetDescription>
                                <EditableWorkout/>
                            </SheetHeader>
                        </SheetContent>
                        </Sheet>
                    </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {exercisePatterns.map((exercisePattern, index) => (
                    <ExercisePattern key={index} name={exercisePattern.name} />
                    ))}
                </div>
                <div className="flex justify-center items-center md:min-h-min">
                        <Carousel className='w-[90%] fancy-shadow rounded-md bg-(--dominant)'   
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[carouselPlugin.current]}
                        >
                        <CarouselContent>
                            {workoutPatterns.map((workoutPattern, index) => {
                                return(
                                        <CarouselItem key={index}>
                                            <WorkoutPattern name={workoutPattern.name} content={workoutPattern.content}/>
                                        </CarouselItem>)
                            })}
                        </CarouselContent>
                        <CarouselPrevious className='cursor-pointer hidden sm:flex bg-(--dominant) border-(--dominant)' />
                        <CarouselNext className='cursor-pointer hidden sm:flex bg-(--dominant) border-(--dominant)' />
                        </Carousel>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>
      )
}