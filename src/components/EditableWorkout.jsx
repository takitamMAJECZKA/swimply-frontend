import { useState, useEffect } from "react";
import editIcon from "../assets/editIcon.png"
import Exercise from "./Exercise";
import Break from "./Break";
import {convertMinsToSecs, convertSecsToHours} from '../TimeCalculate.js'
import {v4 as uuidv4} from 'uuid'



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function EditableWorkout(props){
    let date = new Date();

    let [content, setContent] = useState([])
    let [workoutData, setWorkoutData] = useState({name: 'Trening', timeLong: 0, distance: 0, workoutDate: date ,elementsIn: [...content]})

    function handleWorkoutNameChange(e){
        setWorkoutData({...workoutData, name: e.target.value})
    }

    useEffect(() => {
        onContentChange()
    }, [content])

    function onContentChange(){
        let calculateTime = 0;
        let calculateDistance = 0;
        content.forEach((element) => {
            if(convertMinsToSecs(element.time)!=NaN){
                calculateTime += convertMinsToSecs(element.time);
            }else{
                setWorkoutData({...workoutData, timeLong: 0})
            }
            if(element.distance != undefined){
                calculateDistance += element.distance;
            }
        })
        setWorkoutData({...workoutData, timeLong: convertSecsToHours(calculateTime), distance: calculateDistance, elementsIn: [...content]})
    }

    function handleAddExercise(){
        setContent(c => [...c, {type:'exercise', id: uuidv4()}])
    }
    
    function handleAddBreak(){
        setContent(c => [...c, {type:'break', id: uuidv4()}])
    }

    function handleElementDelete(id){
        let updatedContent = content.filter((element) => element.id!==id  )
        
        setContent(updatedContent)
    }

    function updateData(elementData){
        if(elementData.type='exercise'){
            content.map((element) => {
                if(element.id == elementData.id){
                    element.name = elementData.name;
                    element.distance = elementData.distance;
                    element.time = elementData.time;
                    setContent([...content])
                }
            })
        }else{
            content.map((element) => {
                if(element.id == elementData.id){
                    element.name = elementData.name;
                    element.time = elementData.time;
                    setContent([...content])
                }
            })
        }
    }

    function handleFinishWorkout(){
        if(workoutData.timeLong!=0 && workoutData.distance!=0){
            props.addWorkoutToList(workoutData)
            setContent([])
            setWorkoutData({name: 'Trening', timeLong: 0, distance: 0, workoutDate: date ,elementsIn: [...content]})
        }
    }

    return(
        <div className="workoutContainer fancy-shadow">
            <div className="workoutHeader">
                <label><input type="text" onChange={(e) => {handleWorkoutNameChange(e)}} className="workoutName dataInput" placeholder="Nazwa treningu" value={workoutData.name}/><img className="editIcon" src={editIcon} alt="edit" /></label>
                <div className="workoutInfo">
                    <div className="workoutDate">{date.getDate()} {date.toLocaleDateString('pl-PL', {month:'long'})} {date.getFullYear()}</div>
                    <div className="workoutDistance">{workoutData.distance > 1000 ? `${workoutData.distance/1000} km` : `${workoutData.distance} m`}</div>
                    <div className="workoutTime">{workoutData.timeLong=="NaN:NaN:NaN" ? '00:00:00': workoutData.timeLong}(hh:mm:ss)</div>
                </div>
            </div>
            <div className="exercisesAndBreaksWrapper">
                {content.map((element, i)=>{
                    if (element.type == 'exercise'){
                        return(
                        <Exercise key={element.id} id={element.id} index={i} updateData={updateData} deleteFunc={handleElementDelete} />
                        )
                    }else{
                        return(
                            <Break key={element.id} id={element.id} index={i} updateData={updateData} deleteFunc={handleElementDelete}/>
                            )
                    }
                })}
            </div>
            <div className="addElements">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-[10px]">
                            <div className="addExercise cursor-pointer">Dodaj ćwiczenie</div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="cursor-pointer">Dodaj gotowe ćwiczenie</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {handleAddExercise()}}>Dodaj własne ćwiczenie</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                <button className="addBreak" onClick={() => {handleAddBreak()}}>Dodaj przerwę</button>
                <button className="finishWorkout" onClick={() => {handleFinishWorkout()}}>Zakończ</button>
            </div>
        </div>
    )
}