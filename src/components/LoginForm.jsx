import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { toast } from "sonner"
export default function LoginForm(){
    const errorRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()

    function login(){
        let username = usernameRef.current.value
        let password = passwordRef.current.value
        loginError.style.display = 'none'
        try{
            fetch('https://swimply.pl/sign-in',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            }).then((res)=>{
                if(!res.ok){
                    toast.error('Błąd podczas logowania.')
                    if(res.status === 401){
                        errorRef.current.style.display = 'block';
                    }
                    throw new Error('Wrong username or password')
                }else{
                    return res.json()
                }
            })
            .then(data=>{
                    document.cookie = `refresh_token=${data.refresh_token}; path=/`
                    localStorage.setItem('access_token', data.access_token)
                    window.location.href = '/home'
            })
        }catch(e){
            console.error(e)
        }
    }
    
    return(
        <div id="loginFormContainer" className="fancy-shadow grid grid-cols-1">
            <form onSubmit={(e)=>e.preventDefault()}>
                <h2 id="loginHeader">ZALOGUJ</h2>
            <div className="grid grid-cols-1 gap-10">
                <div className="w-full flex items-center justify-between flex-col lg:flex-row gap-3">
                    <label htmlFor="username" className="text-left">Nazwa użytkownika:</label><input type="text" id="username" ref={usernameRef} autoFocus/>
                </div>
                <div className="w-full flex items-center justify-between flex-col lg:flex-row gap-3">
                    <label htmlFor="password" className="text-left">Hasło:</label>
                    <input type="password" ref={passwordRef} id="password"/>
                </div>
            </div>
            <Separator className='bg-(--aqua)' />
            <div className="flex items-center justify-center flex-col gap-3">
                <p id="loginError" ref={errorRef}>Nie prawidłowe hasło lub nazwa użytkownika.</p>
                <p className="text-center">Nie masz jeszcze konta? <Link to="/signup"><span id="changeToRegister">Zarejestruj się.</span></Link></p>
                <button id="loginBtn" onClick={()=>login()}>Zaloguj</button>
            </div>
            </form>
        </div>
        )
}