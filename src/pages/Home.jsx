
import { Link } from "react-router-dom"
import AddNewWorkout from "../Components/AddNewWorkout"
import Workout from "../Components/Workout"


export default function Home(){
    return(
    <div id="homePage">
        <h1>Home</h1>
        <Link to="/login">Login</Link><br />
        <Link to="/stats">Stats</Link><br />
        <Link to="/account">Account</Link>
        <AddNewWorkout />
        <Workout />
    </div>
    )
}