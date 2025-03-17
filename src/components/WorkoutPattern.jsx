import {CirclePlus} from 'lucide-react'
import { toast} from "sonner"

export default function ExercisePattern(props) {
    function handleAddToWorkout(){
                localStorage.setItem('currentWorkout', JSON.stringify({name: props.name, timeLong: 0, distance: 0, workoutDate: new Date() ,elementsIn: [...props.content]}));
                toast.success(`Trening ${props.name.toLowerCase()} został ustawione jako szablon`, {
                    action: {
                        label: "X",
                        onClick: () => console.log("X clicked"),
                    }})
    }
    return(
        <div className="rounded-md relative lg:flex lg:flex-row display-block bg-(--dominant)">
            <div className='flex justify-center items-center'>
            <h1 className='workoutName p-6 text-2xl!'>{props.name}</h1>
            <div className="w-full flex justify-end gap-4 absolute top-0 right-0">
                <button className='cursor-pointer' onClick={() => {handleAddToWorkout()}}>
                    <CirclePlus className='m-1' size='42'/>
                </button>
            </div>
            </div>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-3'>
                {props.content.map(element =>{
                    return(
                    <div key={element.id} className="grid grid-cols-2 md:flex md:items-center gap-4 p-3 rounded-md bg-(--light-dominant)">
                        <span>{element.name ? element.name : 'Przerwa'}</span>
                        <span className={element.time == "00:00" ? 'hidden' : 'block'}>{element.time} (minut:sekund)</span>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}