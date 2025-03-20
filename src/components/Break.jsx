import { useState, useEffect } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

export default function Break(props){
        let [breakInfo, setBreakInfo] = useState(() => {
            let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
            savedData = savedData ? savedData.elementsIn.find((element) => element.id === props.id) : null;
            return savedData ? savedData : {id: props.id, name:'Przerwa', type:'break', time:'00:00'};
        });
        
        useEffect(()=>{
            props.updateData(breakInfo)
        }, [breakInfo])
    
        function handleTimeChange(value){
            if(value!=null){
                const formatted = value.slice(0, 2) + ":" + value.slice(2);
                setBreakInfo({...breakInfo , time: formatted})
            }else{
                setBreakInfo({...breakInfo , time: ''})
            }
        }
    
        return(
            <div className="break">
                <p className="breakName">Przerwa</p>
                <div className="dataInputsWrapper">
                <label className="flex justify-center items-center">
                    <div className="mr-3">Czas(mm:ss): </div>
                    <InputOTP maxLength={4} onFocus={() => handleTimeChange(null)} value={breakInfo.time.replace(':', "")} onChange={(value)=>{handleTimeChange(value)}}>
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
                <div className="breakButtons">
                    <button className="deleteButton" onClick={()=>{props.deleteFunc(breakInfo.id)}}>X</button>
                </div>
            </div>
        )
}