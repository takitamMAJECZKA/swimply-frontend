import { useState } from "react";
import {CirclePlus} from 'lucide-react'
import { Link } from "react-router";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
export default function AddNewWorkout(){
    return(
        <>
            <div id="addNewWorkout" className="fancy-shadow">
                <DropdownMenu>
                    <DropdownMenuTrigger className="">
                        <button id="addNewWorkoutBtn"><CirclePlus size='86'></CirclePlus></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link to="/workouts"><DropdownMenuItem className="cursor-pointer">Dodaj nowy trening</DropdownMenuItem></Link>
                        <DropdownMenuSeparator />
                        <Link to="/patterns"><DropdownMenuItem className="cursor-pointer">Dodaj nowy szablon</DropdownMenuItem></Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}