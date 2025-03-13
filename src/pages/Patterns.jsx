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
  

import ExercisePattern from "@/components/ExercisePattern"
import EditableWorkout from "../components/EditableWorkout"

export default function Patterns(){
    let exercisePatterns = [
        {name: 'Żabka'},
        {name: 'Kraul'},
        {name: 'Motylek'},
        {name: 'Grzbiet'},
        {name: 'Żabka ratownicza'},
        {name: 'Kraul ratowniczy'},]
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
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="w-full flex justify-center items-center md:min-h-min">
                    <Sheet>
                        <SheetTrigger><div className="p-4 bg-[var(--dominant)] rounded-md text-2xl font-bold border border-[2px] border-(--aqua) fancy-shadow m-3">Current Workout</div></SheetTrigger>
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
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>
      )
}