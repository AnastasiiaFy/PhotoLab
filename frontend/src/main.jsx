import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './context/ShopContex.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)