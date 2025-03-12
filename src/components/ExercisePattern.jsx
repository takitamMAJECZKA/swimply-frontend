import React, {useState, useEffect} from 'react'
import {CirclePlus} from 'lucide-react'
import { Link } from 'react-router'

export default function ExercisePattern(props) {


    return(
        <div className="exercise">
            <h1 className='exerciseName p-2 text-2xl!'>{props.name}</h1>

            <div className="w-full flex justify-end gap-4">
                <button>
                    <Link to='/workouts#add'>
                        <CirclePlus className='m-2' size='42'/>
                    </Link>
                    </button>
            </div>
        </div>
    )
}