import { useState, useEffect } from "react";
import editIcon from "../assets/editIcon.png"
import Exercise from "./Exercise";
import Break from "./Break";
import {convertMinsToSecs, convertSecsToHours} from '../TimeCalculate.js'
import {v4 as uuidv4} from 'uuid'



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
    import LongAreaChartWeekStats from "../components/charts/LongAreaChartWeekStats"


export default function EditableWorkout(props){
    let [content, setContent] = useState([])
    let [workoutData, setWorkoutData] = useState(props.data)
    
    function handleWorkoutNameChange(e){
        setWorkoutData({...workoutData, name: e.target.value})
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
            <div className="workoutContainer fancy-shadow">
                <div className="workoutHeader">
                    <Dialog>
                    <DialogTrigger asChild>
                    <label><input type="text" readOnly onChange={(e) => {handleWorkoutNameChange(e)}} className="workoutName dataInput" placeholder="Nazwa treningu" value={workoutData.name}/>
                        </label>
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
                        <DialogFooter>
                        <DialogClose><div className="saveChangesBtn">Zapisz zmiany</div></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                    <div className="workoutInfo">
                        <div className="workoutDate">{workoutData.workoutDate.getDate()} {workoutData.workoutDate.toLocaleDateString('pl-PL', {month:'long'})} {workoutData.workoutDate.getFullYear()}</div>
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
                            <RadarChartWorkoutsCategory />
                            <RadialProgressChart />
                        </div>
                        <DialogFooter>
                        <DialogClose><div className="saveChangesBtn">Wyjdz</div></DialogClose>
                        </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}