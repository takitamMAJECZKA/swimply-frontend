import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Workouts from './pages/Workouts'
import Patterns from './pages/Patterns'
import Settings from './pages/Settings'
import PaceCalculator from './pages/PaceCalculator'

import ScrollToSection from "./hooks/scroll-to-section";
import { DataProvider } from './components/DataProvider'


import {BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <DataProvider>
        <BrowserRouter>
        <ScrollToSection />
          <Routes>
            <Route index element={<Home />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/home/*" element={<Home />}/>
            <Route path="/signin" element={<Login />}/>
            <Route path="/signin/*" element={<Login />}/>
            <Route path="/signup" element={<Register />}/>
            <Route path="/signup/*" element={<Register />}/>
            <Route path="/workouts" element={<Workouts />}/>
            <Route path="/workouts/*" element={<Workouts />}/>
            <Route path="/patterns" element={<Patterns />}/>
            <Route path="/patterns/*" element={<Patterns />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/settings/*" element={<Settings />}/>
            <Route path="/tools/paceCalculator/*" element={<PaceCalculator />}/>
            <Route path="*" element={<Home />}/>
          </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App