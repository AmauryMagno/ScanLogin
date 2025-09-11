import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes/routes'
import GlobalStyle from './global'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
    <GlobalStyle />
  </StrictMode>,
)
