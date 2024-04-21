import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/About'
import HomePage from './pages'
import ProductsPage from './pages/Products'
import NavBar from './layout/Navbar'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App