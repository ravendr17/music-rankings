import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const res = await fetch("/config.json");

if (!res.ok) throw new Error("config.json not found.");

const config = await res.json();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App config={config} />
  </StrictMode>,
)
