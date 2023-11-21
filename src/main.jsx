import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Providers } from './hooks/Provider.jsx'
import { Custom } from './hooks/Custom.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/socketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <SocketProvider>
          <Custom>
            <App />
          </Custom>
        </SocketProvider>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
)
