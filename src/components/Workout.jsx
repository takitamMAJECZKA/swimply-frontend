import { useState, useEffect } from "react";
import editIcon from "../assets/editIcon.png"
import Exercise from "./Exercise";
import Break from "./Break";
import {convertMinsToSecs, convertSecsToHours} from '../TimeCalculate.js'
import {v4 as uuidv4} from 'uuid'

export default function Workout(){
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
        setWorkoutData({...workoutData, timeLong: convertSecsToHours(calculateTime), distance: calculateDistance})
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

    function getMonthString(){
        switch(date.getMonth()){
            case 0:
                return 'Styczeń'
            case 1:
                return'Luty'
            case 2:
                return'Marzec'
            case 3:
                return'Kwiecień'
            case 4:
                return'Maj'
            case 5:
                return'Czerwiec'
            case 6:
                return'Lipiec'
            case 7:
                return'Sierpień'
            case 8:
                return'Wrzesień'
            case 9:
                return'Październik'
            case 10:
                return'Listopad'
            case 11:
                return'Grudzień'
        }
    }

    return(
        <div className="workoutContainer">
            <div className="workoutHeader">
                <label><input type="text" onChange={(e) => {handleWorkoutNameChange(e)}} className="workoutName dataInput" placeholder="Workout name" value={workoutData.name}/><img className="editIcon" src={editIcon} alt="edit" /></label>
                <div className="workoutInfo">
                    <div className="workoutDate">{date.getDate()} {getMonthString()} {date.getFullYear()}</div>
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
                <button className="addExercise" onClick={() => {handleAddExercise()}}>Dodaj ćwiczenie</button>
                <button className="addBreak" onClick={() => {handleAddBreak()}}>Dodaj przerwę</button>
            </div>
        </div>
    )
}