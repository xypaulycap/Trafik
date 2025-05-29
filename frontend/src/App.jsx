import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import About from './pages/About'
import MenuPage from './pages/MenuPage'
import Contact from './pages/Contact'
import Background from './components/Background'
import Navbar from './components/Navbar'
import SelectedItems from './pages/SelectedItems'
import RegularMenuPage from './pages/RegularMenuPage'
import VipMenuPage from './pages/VipMenuPage'

const App = () => {
  return (
    <Background>
      <div className='min-h-screen w-full overflow-x-hidden'>
        <ToastContainer/>
        <div className='container mx-auto px-2 sm:px-2 lg:px-2 py-4'>
          <Navbar />
          <main className='w-full'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/menu/regular' element={<RegularMenuPage />} />
              <Route path='/menu/vip' element={<VipMenuPage />} />
              <Route path='/menu:item' element={<MenuPage />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/selected-items' element={<SelectedItems />} />
            </Routes>
          </main>
        </div>
      </div>
    </Background>
  )
}

export default App