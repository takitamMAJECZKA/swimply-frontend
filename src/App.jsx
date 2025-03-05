import Home from './pages/Home'
import Login from './pages/Login'
import Stats from './pages/Stats'
import Account from './pages/Account'
import Workouts from './pages/Workouts'
import Patterns from './pages/Patterns'
import Settings from './pages/Settings'


import {BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="/workouts" element={<Workouts />}/>
          <Route path="/patterns" element={<Patterns />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App