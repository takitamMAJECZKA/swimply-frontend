import { useState, useRef } from "react"
import {Mars} from 'lucide-react'
import {Venus} from 'lucide-react'
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"

import { toast } from "sonner"

export default function LoginForm(){
    const errorRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()

    const [weight, setWeight] = useState(70)
    const [isMale, setIsMale] = useState(true)
    const [caloriesGoal, setCaloriesGoal] = useState(1200);

    function handleWeightChange(e) {
        setWeight(parseInt(e.target.value))
    }

    function handleChangeGender(is) {
        setIsMale(is)
    }

    function handleCaloriesGoalChange(e) {
        setCaloriesGoal(parseInt(e.target.value))
    }

    function register(){
        let username = usernameRef.current.value
        let password = passwordRef.current.value

        if (!password || password.length < 8) {
            toast.error('Hasło musi mieć co najmniej 8 znaków.')
            return
        }
        
        if(!username || username.length < 3) {
            toast.error('Nazwa użytkownika musi mieć co najmniej 3 znaki.')
            return
        }

        try{
            fetch('https://swimply.pl/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    weight: weight,
                    isMale: isMale,
                    caloriesGoal: caloriesGoal
                })
            }).then((res)=>{
                if(!res.ok){
                    toast.error('Błąd podczas rejestracji.')
                    if(res.status === 400){
                        errorRef.current.style.display = 'block'
                    }
                    throw new Error('Database error')
                }else{
                    return res.json()
                }
            })
            .then(data=>{
                if(data.error){
                    toast.error('Błąd podczas rejestracji.')
                }else{
                    window.location.href = '/signin'
                }
            })
        }catch(e){
            console.error(e)
        }
    }

    return(
        <div id="registerFormContainer" className="fancy-shadow">
            <form onSubmit={(e)=>e.preventDefault()}>
                <h2 id="registerHeader" className="mb-2! mt-4">ZAREJESTRUJ</h2>
                <div className="p-1 rounded-xl w-full grid grid-cols-1 gap-6">
                    <div className="flex items-center justify-between flex-col xl:flex-row gap-3">
                        <label htmlFor="username" className="text-center xl:text-left">Nazwa użytkownika:</label>
                        <input type="text" id="username" ref={usernameRef} autoFocus/>
                    </div>
                    <div className="flex items-center justify-between flex-col xl:flex-row gap-3">
                        <label htmlFor="password">Hasło:</label>
                        <input type="password" id="password" ref={passwordRef}/>
                    </div>
                    <Separator className="bg-(--aqua)" />
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-3 relative">
                        <div className="flex items-center justify-between">
                            <label htmlFor="weight"><h3>Waga:</h3></label>
                            <label><input id="weight" type="number" min='20' max='200' onChange={(e) => handleWeightChange(e)} value={weight} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[75px]" />kg</label>
                        </div>
                        <Separator orientation="vertical" className="bg-(--aqua) absolute left-[50%] translate-x-[-50%] hidden xl:block"/>
                        <div className="flex items-center justify-between">
                            <div className='w-full flex items-center justify-between'>
                                <h3 className="mt-auto mb-auto">Płeć:</h3>
                                <div className="flex items-center">
                                    <input type="radio" value='male' checked={isMale} id='male' name='gender' className='peer/male hidden' onChange={()=>handleChangeGender(true)}/>
                                    <input checked={!isMale} type="radio" value='female' id='female' name='gender' className='peer/female hidden' onChange={()=>handleChangeGender(false)}/>
                                    <label htmlFor="male" className='bg-gray-800 rounded-l-md cursor-pointer peer-checked/male:bg-gray-600 peer-checked/male:border-gray-400 peer-checked/male:border-1'><Mars size='42'/></label>
                                    <label htmlFor="female" className='bg-gray-800 rounded-r-md cursor-pointer peer-checked/female:bg-gray-600 peer-checked/female:border-gray-400 peer-checked/female:border-1'><Venus size='42'/></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator className="bg-(--aqua)" />
                    <div className="flex items-center justify-between flex-col xl:flex-row gap-3">
                        <label className="text-center xl:text-left" htmlFor="caloriesGoal"><h3>Tygodniowy cel kalorii:</h3></label>
                        <label><input id="caloriesGoal" type="number" min='0' onChange={(e) => handleCaloriesGoalChange(e)} value={caloriesGoal} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[200px]" />kcal</label>
                    </div>
                    <div>
                </div>
                </div>
                <Separator className="bg-(--aqua)" />
                <p id="registerError" ref={errorRef}>Konto z tą nazwą użytkownika lub e-mailem już istnieje.</p>
                <p className="mt-5">Masz już konto? <Link to='/signin'><span id="changeToLogin">Zaloguj się.</span></Link></p>
                <button id="registerBtn" onClick={()=>register()}>Zarejestruj</button>
            </form>
        </div>
    )
}