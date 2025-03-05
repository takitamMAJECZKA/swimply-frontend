import { useState } from "react";
import {CirclePlus} from 'lucide-react'


export default function AddNewWorkout(){
    return(
        <>
            <div id="addNewWorkout">
                <button id="addNewWorkoutBtn"><CirclePlus size='86'></CirclePlus></button>
            </div>
        </>
    )
}