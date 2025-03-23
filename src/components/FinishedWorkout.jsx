import { useState, useEffect } from "react";

import { EllipsisVertical } from "lucide-react"



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
        Popover,
        PopoverContent,
        PopoverTrigger,
    } from "@/components/ui/popover"
      
    import { Badge } from "./ui/badge";

    import RadarChartExercisesCategoryWorkout from "../components/charts/RadarChartExercisesCategoryWorkout"
    import RadialProgressChartWorkout from "../components/charts/RadialProgressChartWorkout"
    import SmallAreaChartWorkout from "../components/charts/SmallAreaChartWorkout"
    import { convertSecsToMins, convertMinsToSecs } from "@/TimeCalculate";

    const equipmentOptions = [
        { id: 'kickboard', name: 'Deska pływacka', group: 'hands' },
        { id: 'handpaddles', name: 'Płetwy na ręce', group: 'hands' },
        { id: 'fins', name: 'Płetwy', group: 'feet' },
        { id: 'monofin', name: 'Monopłetwa', group: 'feet' },
        { id: 'pullbuoy', name: 'Pull buoy (ósemka)', group: 'feet' },
        { id: 'snorkel', name: 'Snorkel (rurka pływacka)', group: 'head' },
        { id: 'noodle', name: 'Makaron pływacki', group: 'other' },
      ];



export default function EditableWorkout(props){
    let [workoutData, setWorkoutData] = useState(props.data);
    let date = new Date(props.data.workoutDate);
    
    function handleWorkoutNameChange(e){
        setWorkoutData({...workoutData, name: e.target.value})
    }

    function calculateExerciseTypes(){
        let data = [{ category: "Wydolność", amount: 0 },{ category: "Siła", amount: 0 },{ category: "Technika", amount: 0 },{ category: "Wstrzymywanie oddechu", amount: 0 },{ category: "Różne", amount: 0 }];
        workoutData.elementsIn.map((element) =>{
            if(element.type == 'exercise'){
                switch (element.subtype.value){
                    case 'wydolnosc':
                        data[0].amount ++;
                        break;
                    case 'sila':
                        data[1].amount ++;
                        break;
                    case 'technika':
                        data[2].amount ++;
                        break;
                    case 'oddech':
                        data[3].amount ++;
                        break;
                    case 'rozne':
                        data[4].amount ++;
                        break;
                }
            }
        })
        return data;
    }
    function calculateEquipmentTypes(){
        let data = [{ id: 'kickboard', category: 'Deska pływacka', amount: 0},
            { id: 'fins', category: 'Płetwy', amount: 0},
            { id: 'handpaddles', category: 'Płetwy na ręce', amount: 0},
            { id: 'monofin', category: 'Monopłetwa', amount: 0},
            { id: 'snorkel', category: 'Snorkel (rurka pływacka)', amount: 0},
            { id: 'pullbuoy', category: 'Pull buoy (ósemka)', amount: 0},
            { id: 'noodle', category: 'Makaron pływacki', amount: 0}]
        workoutData.elementsIn.map((element) =>{
            if(element.type == 'exercise'){
                element.equipment.map(id=>{
                    const equipment = data.find(e => e.id === id);
                    equipment.amount++;
                })
            }
        })
        return data;
    }
    return(           
            <div className="workoutContainer fancy-shadow">
                <div className="workoutHeader">
                    <Dialog>
                    <DialogTrigger asChild>
                    <label><input type="text" readOnly onChange={(e) => {handleWorkoutNameChange(e)}} className="workoutName dataInput" placeholder="Nazwa treningu" value={workoutData.name}/> <EllipsisVertical className="cursor-pointer"/> </label>
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
                            <Input id="name" value={workoutData.name} onChange={(e) => setWorkoutData({...workoutData, name: e.target.value})} className="col-span-3" />
                        </div>
                        <DialogFooter className="flex justify-between!">
                            <DialogClose><div className="saveChangesBtn" onClick={() => {props.deleteWorkout(workoutData.id)}}>Usuń trening</div></DialogClose>
                            <DialogClose><div className="saveChangesBtn">Zapisz zmiany</div></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                    <Dialog>
                    <DialogTrigger asChildb className="cursor-pointer">
                    <div className="workoutInfo">
                        <div className="workoutDate">{date.getDate()} {date.toLocaleDateString('pl-PL', {month:'long'})} {date.getFullYear()}</div>
                        <div className="workoutDistance">{workoutData.distance > 1000 ? `${workoutData.distance/1000} km` : `${workoutData.distance} m`}</div>
                        <div className="workoutTime">{workoutData.timeLong=="NaN:NaN:NaN" ? '00:00:00': workoutData.timeLong}(hh:mm:ss)</div>
                    </div>
                    </DialogTrigger>
                <DialogContent className="min-w-[90%]">
                        <DialogHeader>
                        <DialogTitle>Informacje o {workoutData.name}</DialogTitle>
                        <DialogDescription>
                            <span>
                                {workoutData.name} to trening z dnia {date.getDate()} {date.toLocaleDateString('pl-PL', {month:'long'})} o łącznym czasie {workoutData.timeLong} i pokonanej odległości {workoutData.distance > 1000 ? `${workoutData.distance/1000} km` : `${workoutData.distance} m`}.
                            </span>
                            <br/>
                            <span>
                                Poniżej znajdziesz wykresy z informacjami o poszczególnych ćwiczeniach oraz ich kategoriach.
                            </span>
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 items-center gap-4">
                            <div className="flex justify-center items-center flex-col gap-2 ">
                                {
                                workoutData.elementsIn.map((element) => {
                                    if(element.type == 'exercise'){
                                        return(
                                            <div key={element.id} className="grid grid-cols-3 md:flex md:items-center gap-4 p-3 rounded-md bg-[var(--dominant)]">
                                                <span>{element.name}</span>
                                                <span>{element.time} (minut:sekund)</span>
                                                <Popover>
                                                    <PopoverTrigger className="cursor-pointer flex md:hidden justify-end items-center">
                                                        <EllipsisVertical />
                                                    </PopoverTrigger>
                                                    <PopoverContent className='flex items-center justify-center gap-2 flex-col'>
                                                        <div className="w-full flex items-center justify-center">
                                                            <Badge variant='outline' className='p-1.5 pl-6 pr-6 text-sm font-bold'>{element.subtype.label}</Badge>
                                                        </div>
                                                        <div className="w-full flex items-center justify-around flex-wrap">    
                                                        {element.equipment.map((equ)=>(
                                                            <Badge variant='secondary'>{equ}</Badge>
                                                        ))}
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                <span>{element.distance} metrów</span>
                                                <span>{convertSecsToMins(convertMinsToSecs(element.time)/(element.distance/100))} - tempo na 100m</span>
                                                <Popover>
                                                    <PopoverTrigger className="cursor-pointer row-span-2 hidden md:block">
                                                        <EllipsisVertical />
                                                    </PopoverTrigger>
                                                    <PopoverContent className='flex items-center justify-center gap-2 flex-col'>
                                                        <div className="w-full flex items-center justify-center">
                                                            <Badge variant='outline' className='p-1.5 pl-6 pr-6 text-sm font-bold'>{element.subtype.label}</Badge>
                                                        </div>
                                                        <div className="w-full flex items-center justify-around flex-wrap gap-1.5">    
                                                        {element.equipment.map(id => {
                                                            const equipment = equipmentOptions.find(e => e.id === id);
                                                            return (
                                                            <Badge key={id} variant="secondary" className="gap-1">
                                                                {equipment.name}
                                                            </Badge>
                                                            );
                                                        })}
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div key={element.id} className="flex items-center gap-4 p-3 rounded-md bg-[var(--aqua-dominant)]">
                                                <span>{element.name}</span>
                                                <span>{element.time} (minut:sekund)</span>
                                            </div>
                                        )
                                    }
                                })
                                }
                            </div>
                            <SmallAreaChartWorkout workoutContent={workoutData.elementsIn}/>
                            <RadarChartExercisesCategoryWorkout exercisesTypeAmount = {calculateExerciseTypes()} equipmentTypeAmount={calculateEquipmentTypes()}/>
                            <RadialProgressChartWorkout caloriesBurnt ={[{caloriesBurnt: 1000}]}  />
                        </div>
                        <DialogFooter>
                        <DialogClose><div className="saveChangesBtn">Wyjdź</div></DialogClose>
                        </DialogFooter>
            </DialogContent>
            </Dialog>
                </div>
            </div>
    )
}