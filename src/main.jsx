import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WorksProvider } from './context/WorksContext.jsx'
import { SelectWorksProvider } from './context/SelectWorksContext.jsx'
import { AboutProvider } from './context/AboutContext.jsx'
import { BrandLogosProvider } from './context/BrandLogosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WorksProvider>
        <SelectWorksProvider>
          <AboutProvider>
            <BrandLogosProvider>
              <App/>
            </BrandLogosProvider>
          </AboutProvider>
        </SelectWorksProvider>
      </WorksProvider>
    </BrowserRouter>
  </StrictMode>,
)
