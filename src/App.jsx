import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SVCardPage from './pages/SVCardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SVcards" element={<SVCardPage />} />
    </Routes>
  )
}

export default App
