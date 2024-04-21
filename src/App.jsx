import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/About'
import HomePage from './pages'
import ProductsPage from './pages/Products'
import NavBar from './layout/Navbar'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App