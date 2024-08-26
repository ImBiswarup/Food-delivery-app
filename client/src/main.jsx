import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ItemContextProvider } from './context/ItemContext.jsx'


createRoot(document.getElementById('root')).render(
  <AuthContextProvider >
    <ItemContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ItemContextProvider>
  </AuthContextProvider>
)
