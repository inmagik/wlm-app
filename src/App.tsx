import { Route, Routes, BrowserRouter } from 'react-router-dom'
import List from './pages/Mobile/List'
import Map from './pages/Mobile/Map'
import Profile from './pages/Mobile/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/lista" element={<List />} />
        <Route path="/profilo" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
