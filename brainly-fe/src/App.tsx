import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signin } from "./pages/Signin";
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ShareDashboard } from './pages/ShareDashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/share/:sharelink' element={<ShareDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
