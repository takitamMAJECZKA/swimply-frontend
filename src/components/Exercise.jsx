import { useState, useEffect } from "react"
import { Pencil } from 'lucide-react';
import {convertMinsToSecs, convertSecsToMins} from '../TimeCalculate.js'


export default function Exercise(props){
    let [exerciseInfo, setExerciseInfo] = useState(() => {
        let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
        savedData = savedData ? savedData.elementsIn.find((element) => element.id === props.id) : null;
        return savedData ? savedData : {id: props.id, name:'Ćwiczenie '+String(props.index+1), type:'exercise', distance: 0, time:'00:00'};
    });
    
    useEffect(()=>{
        props.updateData(exerciseInfo)
    }, [exerciseInfo])
    
    function handleAmountOfPoolsChange(e){
        setExerciseInfo({...exerciseInfo , distance: e.target.value*25})
    }

    function handleTimeChange(e){
        setExerciseInfo({...exerciseInfo , time: e.target.value})
    }

    function handleExerciseNameChange(e){
        setExerciseInfo({...exerciseInfo , name: e.target.value})
    }

    return(
        <div className="exercise">
            <label><input type="text" onChange={(e) => {handleExerciseNameChange(e)}} className="exerciseName dataInput" placeholder="Exercise name" value={exerciseInfo.name}/><Pencil/></label>
            <div className="dataInputsWrapper">
                <label>Liczba basenów(25m): <input type="number" min={0} value={exerciseInfo.distance/25} onChange={(e)=>{handleAmountOfPoolsChange(e)}} className="dataInput exercisePoolsInput"/></label>
                <label>Czas(mm:ss): <input type="text" value={exerciseInfo.time} placeholder="mm:ss"onChange={(e)=>{handleTimeChange(e)}} className="dataInput exerciseTimeInput"/></label>
            </div>
            <div className="exerciseCalculations">
                <div className="exerciseDistance">Dystans(m): {exerciseInfo.distance}</div>
                <div className="exercisePace">Tempo(/100m): {convertSecsToMins(convertMinsToSecs(exerciseInfo.time)/(exerciseInfo.distance/100)) != 'NaN:NaN' ? convertSecsToMins(convertMinsToSecs(exerciseInfo.time)/(exerciseInfo.distance/100)) : '00:00'}</div>
            </div>
            <div className="exerciseButtons">
                <button className="deleteButton" onClick={()=>{props.deleteFunc(exerciseInfo.id)}}>X</button>
            </div>
        </div>
    )
}