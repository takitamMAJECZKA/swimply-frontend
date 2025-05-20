import { useState, useEffect, useContext } from "react"
import { Pencil } from 'lucide-react';
import {convertMinsToSecs, convertSecsToMins} from '../TimeCalculate.js'
import { AddExerciseType } from "./AddExerciseType.jsx";


import EquipmentSelector from "./EquipmentSelector.jsx";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

import getCalories from "@/CaloriesCalculate.js";
import { DataContext } from "../components/DataProvider";


export default function Exercise(props){
    const [exerciseInfo, setExerciseInfo] = useState(() => {
        let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
        savedData = savedData ? savedData.elementsIn.find((element) => element.id === props.id) : null;
        return savedData ? savedData : {id: props.id, name: props.name, type:'exercise', distance: 0, time:'00:00', subtype: {label: 'Różne' , value:'rozne'}, equipment: [], caloriesBurnt: 0, strokeType: null};
    });

    const { workoutsData, workoutsLoading, accountData, accountLoading } = useContext(DataContext);
    
    
    useEffect(()=>{
        props.updateData(exerciseInfo)
    }, [exerciseInfo])
    
    function handleAmountOfPoolsChange(e){
        const value = e.target.value.replace(/\D+$/, '');
        setExerciseInfo(e => ({...e , distance: value * props.poolLength}))
        handleCaloriesCount();
    }

    function handleTimeChange(value){
        if(value!=null){
            const formatted = value.slice(0, 2) + ":" + value.slice(2);
            setExerciseInfo(e => ({...e , time: formatted}))
            handleCaloriesCount();
        }else{
            setExerciseInfo(e => ({...e , time: ''}))
        }
    }

    function handleCaloriesCount(){
        const paceInSeconds = convertMinsToSecs(exerciseInfo.time)/(exerciseInfo.distance/100)
        const calculatedCalories = Math.round(getCalories(paceInSeconds, accountData.weight, convertMinsToSecs(exerciseInfo.time)/3600, exerciseInfo.strokeType, exerciseInfo.equipment))
        if(paceInSeconds != NaN){
            setExerciseInfo(e => ({...e,
                caloriesBurnt: calculatedCalories
            }))
        }
    }
    
    function handleExerciseNameChange(e){
        setExerciseInfo({...exerciseInfo , name: e.target.value})
    }
    
    function handleSubTypeChange(value){
        setExerciseInfo({...exerciseInfo , subtype: value})
    }
    
    function handleEquipmentChange(equipment){
        setExerciseInfo(e => ({...e, equipment: equipment}))
        handleCaloriesCount();
    }

    return(
        <div className="exercise">
            <label><input type="text" onChange={(e) => {handleExerciseNameChange(e)}} className="exerciseName dataInput" placeholder="Nazwa ćwiczenia" value={exerciseInfo.name}/><Pencil className="cursor-pointer"/></label>
            <AddExerciseType parentId={exerciseInfo.id} setExerciseSubType={handleSubTypeChange}/>
            <div className="dataInputsWrapper">
                <label>{(props.poolLength == 25 || props.poolLength == undefined || props.poolLength == null) && "Liczba basenów(25m): "}
                {(props.poolLength == 50) && "Liczba basenów(50m): "}
                {(props.poolLength == 1) && "Liczba metrów: "}
                    <input type="text" value={exerciseInfo.distance/props.poolLength} onChange={(e)=>{handleAmountOfPoolsChange(e)}} className="dataInput exercisePoolsInput"/></label>
                <label className="flex justify-center items-center">
                    <div className="mr-3">Czas(mm:ss): </div>
                    <InputOTP maxLength={4} value={exerciseInfo.time.replace(':', "")} onFocus={() => handleTimeChange(null)}  onChange={(value)=>{handleTimeChange(value)}}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                            <InputOTPSeparator></InputOTPSeparator>
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                </label>
            </div>
            <div className="exerciseCalculations">
                <div className="exerciseDistance">Dystans(m): {exerciseInfo.distance}</div>
                <div className="exercisePace">Tempo(/100m): {convertSecsToMins(convertMinsToSecs(exerciseInfo.time)/(exerciseInfo.distance/100)) != 'NaN:NaN' ? convertSecsToMins(convertMinsToSecs(exerciseInfo.time)/(exerciseInfo.distance/100)) : '00:00'}</div>
            </div>
            <div className="flex justify-center items-center">
                <EquipmentSelector handleEquipmentChange={handleEquipmentChange} parentId={exerciseInfo.id}/>
            </div>
            <div className="exerciseButtons">
                <button className="deleteButton" onClick={()=>{props.deleteFunc(exerciseInfo.id)}}>X</button>
            </div>
        </div>
    )
}