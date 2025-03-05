import { useState } from "react";
import plusIcon from "../assets/plusIcon.png"


export default function AddNewWorkout(){
    return(
        <>
            <div id="addNewWorkout">
                <button id="addNewWorkoutBtn"><img src={plusIcon} alt="Add new workout" /></button>
            </div>
        </>
    )
}