import { useState } from "react"


export default function LoginForm(){

    let [returnLogin, setReturnLogin] = useState(true)

    
    if (returnLogin){
        return(
            <div id="loginFormContainer">
                <form>
                    <h2 id="loginHeader">ZALOGUJ</h2>
                    <label>Nazwa użytkownika: <input type="text" id="username"/></label>
                    <label>Hasło: <input type="password" id="password"/></label>
                    <p id="loginError">Nie prawidłowe hasło lub nazwa użytkownika.</p>
                    <p>Nie masz jeszcze konta? <span id="changeToRegister" onClick={()=>{setReturnLogin(false)}}>Zarejestruj się.</span></p>
                </form>
                <button id="loginBtn">Zaloguj</button>
            </div>
        )
    }else{
        return(
            <div id="registerFormContainer">
                <form>
                    <h2 id="registerHeader">ZAREJESTRUJ</h2>
                    <label>Nazwa użytkownika: <input type="text" id="username"/></label>
                    <label>Hasło: <input type="password" id="password"/></label>
                    <label>E-mail: <input type="email" id="email"/></label>
                    <p id="registerError">Konto z tą nazwą użytkownika lub e-mailem już istnieje.</p>
                    <p>Masz już konto? <span id="changeToLogin" onClick={()=>{setReturnLogin(true)}}>Zaloguj się.</span></p>
                </form>
                <button id="registerBtn">Zarejestruj</button>
            </div>
        )
    }
}