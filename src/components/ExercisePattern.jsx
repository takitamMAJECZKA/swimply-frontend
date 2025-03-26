import {CirclePlus} from 'lucide-react'
import { toast} from "sonner"
import {v4 as uuidv4} from 'uuid'

import {FreestyleIcon, BreaststrokeIcon, BackstrokeIcon, ButterflyIcon, BreaststrokeHeadAboveIcon, FreestyleHeadAboveIcon} from '@/assets/Icons'

export default function ExercisePattern(props) {
    function handleAddToWorkout(){
        let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
        let newElement = {id: uuidv4(), name: props.name, type: 'exercise', distance: 0, time: '00:00', subtype: {label: 'Różne' , value:'rozne'}, equipment: []};
        if(savedData){
                savedData.elementsIn.push(newElement);
                localStorage.setItem('currentWorkout', JSON.stringify(savedData));
                toast.success(<div className='w-full h-full p-2 cursor-pointer' onClick={() => props.handleToastClick()}>Ćwiczenie {props.name} zostało dodane</div>, {
                    action: {
                        label: "X",
                        onClick: () => console.log("X clicked"),
                    }
                })
        }else{
            let newWorkout = {name: 'Trening', timeLong: 0, distance: 0, workoutDate: new Date(), elementsIn: [newElement]}
            localStorage.setItem('currentWorkout', JSON.stringify(newWorkout));
            toast.success(<div className='w-full h-full p-2' onClick={() => props.handleToastClick()}>Ćwiczenie {props.name} zostało dodane</div>, {
                action: {
                    label: "X",
                    onClick: () => console.log("X clicked"),
                }
            })
        }
    }

    function retIcon() {
        switch(props.name){
            case 'Kraul':
                return <FreestyleIcon/>
            case 'Żabka':
                return <BreaststrokeIcon/>
            case 'Grzbiet':
                return <BackstrokeIcon/>
            case 'Motylek':
                return <ButterflyIcon/>
            case 'Żabka niekryta':
                return <BreaststrokeHeadAboveIcon/>
            case 'Kraul ratowniczy':
                return <FreestyleHeadAboveIcon/>
        }
    }

    return(
        <div className="exercise relative fancy-shadow">
            <div className='w-full grid grid-cols-2 sm:flex sm:justify-around items-center p-4'>
                {retIcon()}
                <h1 className='exerciseName p-6 text-2xl!'>{props.name}</h1>
            </div>
            <div className="w-full flex justify-end gap-4 absolute top-0 right-0">
                <button className='cursor-pointer' onClick={() => {handleAddToWorkout()}}>
                    <CirclePlus className='m-1' size='42'/>
                </button>
            </div>
        </div>
    )
}