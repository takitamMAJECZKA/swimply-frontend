import Home from './pages/Home'
import Login from './pages/Login'
import Stats from './pages/Stats'
import Account from './pages/Account'


import {BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App