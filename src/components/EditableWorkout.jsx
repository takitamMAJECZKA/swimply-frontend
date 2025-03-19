import { useState, useEffect } from "react";
import { Pencil, Eraser, EllipsisVertical } from 'lucide-react';
import Exercise from "./Exercise";
import Break from "./Break";
import {convertMinsToSecs, convertSecsToHours} from '../TimeCalculate.js'
import {v4 as uuidv4} from 'uuid'



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Link } from "react-router-dom";


import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"  


  import { Button } from "./ui/button";
import PatternsSearcher from "./PatternsSearcher";

export default function EditableWorkout(props){
    let date = new Date();

    const [content, setContent] = useState(() => {
        const savedData = localStorage.getItem('currentWorkout');
        return savedData ? JSON.parse(savedData).elementsIn : [];
    });
    const [workoutData, setWorkoutData] = useState(() => {
        const savedData = localStorage.getItem('currentWorkout');
        return savedData ? JSON.parse(savedData) : {name: 'Trening', timeLong: 0, distance: 0, workoutDate: date ,elementsIn: [...content]};
    });
    
    const [searcherOpen, setSearcherOpen] = useState(false)
    const [selectedPattern, setSelectedPattern] = useState(
      null
    )

    function handleWorkoutNameChange(e){
        setWorkoutData({...workoutData, name: e.target.value})
    }

    useEffect(() => {
        onContentChange()
    }, [content])

    useEffect(() => {
        localStorage.setItem('currentWorkout', JSON.stringify(workoutData));
    }, [workoutData])
    
    useEffect(()=>{
        handleAddToWorkoutFromPattern()
    }, [selectedPattern])

    function handleAddToWorkoutFromPattern(){
        if(selectedPattern != null){
            setContent(c => [...c, {id: uuidv4(), name: selectedPattern.label, type: 'exercise', distance: 0, time: '00:00'}])
        }
    }

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
        setContent(c => [...c, {name: null, type:'exercise', id: uuidv4()}])
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
                    element.subtype = elementData.subtype;
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
            if(props.addWorkoutToList){
                props.addWorkoutToList(workoutData)
                setContent([])
                setWorkoutData({name: 'Trening', timeLong: 0, distance: 0, workoutDate: date ,elementsIn: [...content]})
            }
        }
    }
    return(
        <div className="workoutContainer fancy-shadow">
            <div className="workoutHeader">
                <div className="flex justify-between"><label className="w-full flex justify-between items-center"><input type="text" id="name" onChange={(e) => {handleWorkoutNameChange(e)}} className="workoutName dataInput" placeholder="Nazwa treningu" value={workoutData.name}/><Pencil className="mr-2"/> </label>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <div className="w-full cursor-pointer flex items-center justify-around" onClick={()=> {setWorkoutData({workoutData, name:"Trening"}) ;setContent([])}}><Eraser/>Wyczyść</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
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
                        <Exercise key={element.id} id={element.id} index={i} name={element.name} updateData={updateData} deleteFunc={handleElementDelete} />
                        )
                    }else{
                        return(
                            <Break key={element.id} id={element.id} index={i} updateData={updateData} deleteFunc={handleElementDelete}/>
                            )
                    }
                })}
            </div>
            <div className="grid grid-cols-2 items-center justif-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-[10px]">
                            <div className="addExercise cursor-pointer">Dodaj ćwiczenie</div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                                <Drawer open={searcherOpen} onOpenChange={setSearcherOpen}>
                                      <DrawerTrigger asChild>
                                        <Button  className="cursor-pointer w-auto justify-start bg-(--dominant) text-(--light-aqua) hover:bg-(--light-aqua) hover:text-(--dominant)">
                                          + Wyszukaj gotowe ćwiczeni
                                        </Button>
                                      </DrawerTrigger>
                                      <DrawerContent>
                                        <div className="mt-4 border-t">
                                            <PatternsSearcher setOpen={setSearcherOpen} setSelectedStatus={setSelectedPattern} />
                                        </div>
                                      </DrawerContent>
                                    </Drawer>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {handleAddExercise()}}>Dodaj własne ćwiczenie</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                <button className="addBreak" onClick={() => {handleAddBreak()}}>Dodaj przerwę</button>
                <Link to="../workouts" className="flex justify-center"><button className="finishWorkout" onClick={() => {handleFinishWorkout()}}>Zakończ</button></Link>
            </div>
        </div>
    )
}