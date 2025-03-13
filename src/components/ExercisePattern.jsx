import React, {useState, useEffect} from 'react'
import {CirclePlus} from 'lucide-react'
import { toast} from "sonner"
import {X} from 'lucide-react'

export default function ExercisePattern(props) {
    return(
        <div className="exercise relative fancy-shadow">
            <h1 className='exerciseName p-6 text-2xl!'>{props.name}</h1>
            <div className="w-full flex justify-end gap-4 absolute top-0 right-0">
                <button className='cursor-pointer' onClick={() =>
                toast("Ćwiczenie dodane", {
                description: `Ćwiczenie ${props.name.toLowerCase()} zostało dodane do planu`,
                action: {
                    label: "X",
                    onClick: () => console.log("X clicked"),
                }})}>
                    <CirclePlus className='m-1' size='42'/>
                </button>
            </div>
        </div>
    )
}