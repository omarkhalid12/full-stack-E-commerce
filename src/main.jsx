import ReactDOM from 'react-dom/client'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Router>

)
