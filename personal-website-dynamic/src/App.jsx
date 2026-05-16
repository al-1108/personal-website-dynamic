import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExperiencePage from './pages/ExperiencePage'
import FrcWorlds from './pages/blogs/FrcWorlds'
import FirstPost from './pages/blogs/FirstPost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/blogs/frc-worlds" element={<FrcWorlds />} />
        <Route path="/blogs/first-post" element={<FirstPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
