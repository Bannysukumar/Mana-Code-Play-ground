import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './utils/AuthContext'
import InstallPrompt from './components/InstallPrompt'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <AppRoutes />
        <InstallPrompt />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

