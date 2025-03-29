import { useState, useRef } from "react"
import { Link } from "react-router-dom"

export default function LoginForm(){
    const errorRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()

    function register(){
        let username = usernameRef.current.value
        let password = passwordRef.current.value
        let email = emailRef.current.value
        errorRef.current.style.display = 'none'
        fetch('http://62.171.167.17:6969/signup',{
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
                window.location.href = '/home'
            }
        })
    }

    return(
        <div id="registerFormContainer" className="fancy-shadow">
            <form onSubmit={(e)=>e.preventDefault()}>
                <h2 id="registerHeader" className="mb-2! mt-4">ZAREJESTRUJ</h2>
                <label className="mb-2 sm:mb-10">Nazwa użytkownika: <input type="text" id="username" ref={usernameRef} autoFocus/></label>
                <label className="mb-2 sm:mb-10">Hasło: <input type="password" id="password" ref={passwordRef}/></label>
                <label className="mb-2 sm:mb-10">E-mail: <input type="email" id="email" ref={emailRef}/></label>
                <p id="registerError" ref={errorRef}>Konto z tą nazwą użytkownika lub e-mailem już istnieje.</p>
                <p>Masz już konto? <Link to='/signin'><span id="changeToLogin">Zaloguj się.</span></Link></p>
                <button id="registerBtn" onClick={()=>register()}>Zarejestruj</button>
            </form>
        </div>
    )
}