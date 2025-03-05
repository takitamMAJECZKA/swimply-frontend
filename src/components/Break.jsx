import { useState, useEffect } from "react"
import editIcon from "../assets/editIcon.png"

export default function Break(props){
        let [breakInfo, setBreakInfo] = useState({id: props.id, name:'Przerwa '+String(props.index+1), type:'break', time:'NaN:NaN'})
        
        useEffect(()=>{
            props.updateData(breakInfo)
        }, [breakInfo])
    
        function handleTimeChange(e){
            setBreakInfo({...breakInfo , time: e.target.value})
        }
    
        function handleBreakNameChange(e){
            setBreakInfo({...breakInfo , name: e.target.value})
        }
    
        return(
            <div className="break">
                <p className="breakName">Przerwa</p>
                <div className="dataInputsWrapper">
                    <label>Czas(mm:ss): <input type="text" placeholder="mm:ss"onChange={(e)=>{handleTimeChange(e)}} className="dataInput breakTimeInput"/></label>
                </div>
                <div className="breakButtons">
                    <button className="deleteButton" onClick={()=>{props.deleteFunc(breakInfo.id)}}>X</button>
                </div>
            </div>
        )
}