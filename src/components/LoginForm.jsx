import { useState, useRef } from "react"
import { Link } from "react-router-dom"


export default function LoginForm(){
    const errorRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()

    function login(){
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        loginError.style.display = 'none'
        fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                errorRef.style.display = 'block'
            }else{
                localStorage.setItem('token', data.token)
                window.location.href = '/dashboard'
            }
        })
    }
    
    return(
        <div id="loginFormContainer" className="fancy-shadow">
            <form onSubmit={(e)=>e.preventDefault()}>
                <h2 id="loginHeader">ZALOGUJ</h2>
                <label>Nazwa użytkownika: <input type="text" id="username" ref={usernameRef} autoFocus/></label>
                <label>Hasło: <input type="password" ref={passwordRef} id="password"/></label>
                <p id="loginError" className="hidden" ref={errorRef}>Nie prawidłowe hasło lub nazwa użytkownika.</p>
                <p>Nie masz jeszcze konta? <Link to="/register"><span id="changeToRegister">Zarejestruj się.</span></Link></p>
                <button id="loginBtn" onClick={()=>login()}>Zaloguj</button>
            </form>
        </div>
        )
}