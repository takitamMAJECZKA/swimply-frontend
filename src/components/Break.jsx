import { useState, useEffect } from "react"

export default function Break(props){
        let [breakInfo, setBreakInfo] = useState(() => {
            let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
            savedData = savedData ? savedData.elementsIn.find((element) => element.id === props.id) : null;
            return savedData ? savedData : {id: props.id, name:'Przerwa', type:'break', time:'00:00'};
        });
        
        useEffect(()=>{
            props.updateData(breakInfo)
        }, [breakInfo])
    
        function handleTimeChange(e){
            setBreakInfo({...breakInfo , time: e.target.value})
        }
    
        return(
            <div className="break">
                <p className="breakName">Przerwa</p>
                <div className="dataInputsWrapper">
                    <label>Czas(mm:ss): <input type="text" value={breakInfo.time} placeholder="mm:ss"onChange={(e)=>{handleTimeChange(e)}} className="dataInput breakTimeInput"/></label>
                </div>
                <div className="breakButtons">
                    <button className="deleteButton" onClick={()=>{props.deleteFunc(breakInfo.id)}}>X</button>
                </div>
            </div>
        )
}