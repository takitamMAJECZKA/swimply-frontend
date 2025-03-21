import Home from './pages/Home'
import Login from './pages/Login'
import Workouts from './pages/Workouts'
import Patterns from './pages/Patterns'
import Settings from './pages/Settings'


import ScrollToSection from "./hooks/scroll-to-section";

import {BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <ScrollToSection />
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/home/*" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/login/*" element={<Login />}/>
          <Route path="/workouts" element={<Workouts />}/>
          <Route path="/workouts/*" element={<Workouts />}/>
          <Route path="/patterns" element={<Patterns />}/>
          <Route path="/patterns/*" element={<Patterns />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/settings/*" element={<Settings />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App