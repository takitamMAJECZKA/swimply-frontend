import { useState, useRef } from "react"
import { Link } from "react-router-dom"


export default function LoginForm(){
    const errorRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()

    function login(){
        let username = usernameRef.current.value
        let password = passwordRef.current.value
        let email = emailRef.current.value
        loginError.style.display = 'none'
        fetch('http://62.171.167.17:6969/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                errorRef.current.style.display = 'block'
            }else{
                localStorage.setItem('refresh_token', data.refresh_token)
                window.location.href = '/home'
            }
        })
    }
    
    return(
        <div id="loginFormContainer" className="fancy-shadow">
            <form onSubmit={(e)=>e.preventDefault()}>
                <h2 id="loginHeader">ZALOGUJ</h2>
                <label>Nazwa użytkownika: <input type="text" id="username" ref={usernameRef} autoFocus/></label>
                <label>Hasło: <input type="password" ref={passwordRef} id="password"/></label>
                <label className="mb-2 sm:mb-10">E-mail: <input type="email" id="email" ref={emailRef}/></label>
                <p id="loginError" className="hidden" ref={errorRef}>Nie prawidłowe hasło lub nazwa użytkownika.</p>
                <p>Nie masz jeszcze konta? <Link to="/signup"><span id="changeToRegister">Zarejestruj się.</span></Link></p>
                <button id="loginBtn" onClick={()=>login()}>Zaloguj</button>
            </form>
        </div>
        )
}