import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from '../utils/PrivateRoute'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Lesson from '../pages/Lesson'
import OutputView from '../pages/OutputView'
import PublicProjectPage from '../pages/PublicProjectPage'
import PublishedProjects from '../pages/PublishedProjects'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/lesson/:lessonId"
        element={
          <PrivateRoute>
            <Lesson />
          </PrivateRoute>
        }
      />
      <Route
        path="/lesson/:lessonId/output"
        element={
          <PrivateRoute>
            <OutputView />
          </PrivateRoute>
        }
      />
      <Route
        path="/published"
        element={
          <PrivateRoute>
            <PublishedProjects />
          </PrivateRoute>
        }
      />
      <Route
        path="/p/:projectId"
        element={<PublicProjectPage />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes

