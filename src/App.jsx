import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/About'
import HomePage from './pages'
import ProductsPage from './pages/Products'
import LoginPage from './pages/LoginPage'
import AppLayout from './layout/AppLayout'
import CookieService from './services/CookieService'

const App = () => {
  const token = CookieService.get("jwt")
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductsPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Route>

        <Route path='/login' element={<LoginPage isAuthenticated={token} />} />
      </Routes>
    </>
  )
}

export default App