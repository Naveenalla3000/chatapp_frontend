import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Providers } from './Provider.jsx'
import { Custom } from './hooks/Custom.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <Custom>
        <App />
      </Custom>
    </Providers>
  </React.StrictMode>,
)
