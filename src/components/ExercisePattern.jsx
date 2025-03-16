import {CirclePlus} from 'lucide-react'
import { toast} from "sonner"
import {v4 as uuidv4} from 'uuid'

export default function ExercisePattern(props) {
    function handleAddToWorkout(){
        let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
        let newElement = {id: uuidv4(), name: props.name, type: 'exercise', distance: 0, time: '00:00'};
        if(savedData){
                savedData.elementsIn.push(newElement);
                localStorage.setItem('currentWorkout', JSON.stringify(savedData));
                toast.success(`Ćwiczenie ${props.name} zostało dodane`, {
                    action: {
                        label: "X",
                        onClick: () => console.log("X clicked"),
                    }})
        }else{
            let newWorkout = {name: 'Trening', timeLong: 0, distance: 0, workoutDate: new Date(), elementsIn: [newElement]}
            localStorage.setItem('currentWorkout', JSON.stringify(newWorkout));
            toast.success(`Ćwiczenie ${props.name} zostało dodane`, {
                action: {
                    label: "X",
                    onClick: () => console.log("X clicked"),
            }})
        }
    }
    return(
        <div className="exercise relative fancy-shadow">
            <h1 className='exerciseName p-6 text-2xl!'>{props.name}</h1>
            <div className="w-full flex justify-end gap-4 absolute top-0 right-0">
                <button className='cursor-pointer' onClick={() => {handleAddToWorkout()}}>
                    <CirclePlus className='m-1' size='42'/>
                </button>
            </div>
        </div>
    )
}