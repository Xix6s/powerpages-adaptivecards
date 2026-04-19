import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
      FluentProvider,
} from "@fluentui/react-components";

import App from './App'
import './index.css'

import AuthProvider from './context/AuthContext'
//import ThemeProvider from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FluentProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </FluentProvider>
    </StrictMode>,
)