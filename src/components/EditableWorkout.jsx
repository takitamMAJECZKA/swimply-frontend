import { useState, useEffect } from "react";
import { Ruler, Pencil, Eraser, EllipsisVertical } from 'lucide-react';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"

    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select"

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"  
import { Badge } from "./ui/badge";

import PatternsSearcher from "./PatternsSearcher";
import { toast } from "sonner";

export default function EditableWorkout(props){
    let date = new Date();

    const [content, setContent] = useState(() => {
        const savedData = localStorage.getItem('currentWorkout');
        return savedData ? JSON.parse(savedData).elementsIn : [];
    });
    const [workoutData, setWorkoutData] = useState(() => {
        const savedData = localStorage.getItem('currentWorkout');
        return savedData ? JSON.parse(savedData) : {name: 'Trening', timeLong: 0, distance: 0, workoutDate: date, poolLength: 25,  mainType:['Różne'], elementsIn: [...content]};
    });
    
    const [searcherOpen, setSearcherOpen] = useState(false)
    const [selectedPattern, setSelectedPattern] = useState(
      null
    )

    useEffect(() => {
        onContentChange()
    }, [content])

    useEffect(() => {
        localStorage.setItem('currentWorkout', JSON.stringify(workoutData));
    }, [workoutData])
    
    useEffect(()=>{
        handleExercisePatternSelect()
    }, [selectedPattern])

    function handleWorkoutNameChange(e){
        setWorkoutData({...workoutData, name: e.target.value})
    }

    function handleExercisePatternSelect(){
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
        let data = [];
        content.map((element) => {
            if(element.type == 'exercise'){
                switch (element.subtype.value){
                    case 'wydolnosc':
                        data.push(element.subtype.label)
                        break;
                    case 'sila':
                        data.push(element.subtype.label)
                        break;
                    case 'technika':
                        data.push(element.subtype.label)
                        break;
                    case 'oddech':
                        data.push(element.subtype.label)
                        break;
                    case 'rozne':
                        data.push(element.subtype.label)
                        break;
                }
            }
        })
        data = [... new Set(data)]
        setWorkoutData({...workoutData, timeLong: convertSecsToHours(calculateTime), distance: calculateDistance, elementsIn: [...content], mainType: [...data]})
    }

    function handleAddExercise(){
        setContent(c => [...c, {name: '', type:'exercise', id: uuidv4()}])
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
                    element.equipment = elementData.equipment;
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
        if(workoutData.timeLong!='00:00:00' && workoutData.distance!=0){
            if(props.addWorkoutToList){
                props.addWorkoutToList(workoutData)
                setContent([])
                setWorkoutData({name: 'Trening', timeLong: 0, distance: 0, workoutDate: date, poolLength: 25, mainType:['Różne'], elementsIn: [...content]})
            }
        }else{
            toast.error('Trening nie może nie mieć dystansu, lub nie zająć żadnego czasu.')
        }
    }
    return(
        <div className="workoutContainer fancy-shadow">
            <div className="workoutHeader">
                <div className="flex justify-between"><h1 className="font-bold text-2xl pl-5 pt-3">{workoutData.name ? workoutData.name : "Bez nazwy"}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <Dialog>
                    <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <label htmlFor="name"><div className="w-full cursor-pointer flex items-center justify-around" ><Pencil className="mr-3"/>Zmień nazwę</div></label>
                    </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Zmień nazwę</DialogTitle>
                        <DialogDescription>
                            Zmień nazwę treningu a następnie kliknij przycisk "Zapisz zmiany"
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Nazwa
                            </Label>
                            <Input id="name" value={workoutData.name} onChange={(e) => handleWorkoutNameChange(e)} className="col-span-3" />
                        </div>
                        <DialogFooter>
                            <DialogClose><div className="saveChangesBtn">Zapisz zmiany</div></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                        <Dialog>
                    <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <div className="w-full cursor-pointer flex items-center justify-around" onClick={()=>{}}><Ruler className="mr-3"/>Długość basenu</div>
                    </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Zmień dlugość basenu</DialogTitle>
                        <DialogDescription>
                            Wybierz czy trening odbywał sie na 25-metrowym czy 50-metrowym basenie lub na otwartej wodzie
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Select value={workoutData.poolLength} onValueChange={(value)=>{setWorkoutData({...workoutData, poolLength: value})}}>
                                <SelectTrigger
                                className="w-auto cursor-pointer rounded-lg sm:ml-auto"
                                >
                                    Wybierz długość basenu: 
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="25" className="rounded-lg cursor-pointer">25m</SelectItem>
                                    <SelectItem value="50" className="rounded-lg cursor-pointer">50m</SelectItem>
                                    <SelectItem value="1" className="rounded-lg cursor-pointer">Woda otwarta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <DialogClose><div className="saveChangesBtn">Zamknij</div></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                        <DropdownMenuItem>
                            <div className="w-full cursor-pointer flex items-center justify-start" onClick={()=> {setWorkoutData({...workoutData, name:"Trening"}) ;setContent([])}}><Eraser className="mr-3"/>Wyczyść</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
                <div className="p-1 pl-4 h-auto flex flex-wrap gap-3 justify-around">
                    {workoutData.mainType && workoutData.mainType.map((element, index)=>{
                            return (
                            <Badge key={index} className="bg-(--light-dominant) pl-4 pr-4">{element}</Badge>
                            )
                    })}
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
                        <Exercise key={element.id} id={element.id} index={i} name={element.name} updateData={updateData} deleteFunc={handleElementDelete} poolLength={workoutData.poolLength} />
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
                                            <DropdownMenuItem  
                                              className="cursor-pointer w-auto justify-start bg-(--dominant) text-(--light-aqua) hover:bg-(--light-aqua) hover:text-(--dominant)"
                                              onSelect={(e) => e.preventDefault()}
                                            >
                                              + Wyszukaj gotowe ćwiczenie
                                            </DropdownMenuItem>
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
                <Link to="../workouts" className="flex justify-center finishWorkout" onClick={() => {handleFinishWorkout()}}><button className="cursor-pointer">Zakończ</button></Link>
            </div>
        </div>
    )
}