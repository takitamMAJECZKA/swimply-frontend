import { useState, useEffect } from "react";

import { X } from "lucide-react"



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


    import RadarChartWorkoutsCategory from "../components/charts/RadarChartWorkoutsCategory"
    import RadialProgressChart from "../components/charts/RadialProgressChart"
    import SmallAreaChartWorkout from "../components/charts/SmallAreaChartWorkout"


export default function EditableWorkout(props){
    let [workoutData, setWorkoutData] = useState(props.data)
    
    function handleWorkoutNameChange(e){
        setWorkoutData({...workoutData, name: e.target.value})
    }

    return(           
            <div className="workoutContainer fancy-shadow">
                <div className="workoutHeader">
                    <Dialog>
                    <DialogTrigger asChild>
                    <label><input type="text" readOnly onChange={(e) => {handleWorkoutNameChange(e)}} className="workoutName dataInput" placeholder="Nazwa treningu" value={workoutData.name}/> <X className="cursor-pointer"/> </label>
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
                    <DialogTrigger asChild>
                    <div className="workoutInfo">
                        <div className="workoutDate">{workoutData.workoutDate.getDate()} {workoutData.workoutDate.toLocaleDateString('pl-PL', {month:'long'})} {workoutData.workoutDate.getFullYear()}</div>
                        <div className="workoutDistance">{workoutData.distance > 1000 ? `${workoutData.distance/1000} km` : `${workoutData.distance} m`}</div>
                        <div className="workoutTime">{workoutData.timeLong=="NaN:NaN:NaN" ? '00:00:00': workoutData.timeLong}(hh:mm:ss)</div>
                    </div>
                    </DialogTrigger>
                <DialogContent className="min-w-[90%]">
                        <DialogHeader>
                        <DialogTitle>Informacje o {workoutData.name}</DialogTitle>
                        <DialogDescription>
                            {workoutData.name} to trening z dnia {workoutData.workoutDate.getDate()} {workoutData.workoutDate.toLocaleDateString('pl-PL', {month:'long'})} {workoutData.workoutDate.getFullYear()} o łącznym czasie {workoutData.timeLong} i pokonanej odległości {workoutData.distance > 1000 ? `${workoutData.distance/1000} km` : `${workoutData.distance} m`}.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <SmallAreaChartWorkout workoutContent={workoutData.content}/>
                            <RadarChartWorkoutsCategory />
                            <RadialProgressChart />
                        </div>
                        <DialogFooter>
                        <DialogClose><div className="saveChangesBtn">Wyjdz</div></DialogClose>
                        </DialogFooter>
            </DialogContent>
            </Dialog>
                </div>
            </div>
    )
}