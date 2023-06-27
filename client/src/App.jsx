import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import TaskFormPage from './pages/TaskFormPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import Navbar from './components/Navbar.jsx'
import RosterPage from './pages/RosterPage.jsx'
import { UserProvider } from './context/UserContext.jsx'
import ProtectedManagerRoutes from './ProtectedManagerRoutes.jsx'


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <UserProvider>
          <BrowserRouter>
            <main className='container mx-auto px-10'>
              <Navbar></Navbar>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage></RegisterPage>} />

                <Route element={<ProtectedRoute />}>
                  <Route path='/tasks' element={<TasksPage></TasksPage>} />
                  <Route path='/add-task' element={<TaskFormPage></TaskFormPage>} />
                  <Route path='/tasks/:id' element={<TaskFormPage></TaskFormPage>} />
                  <Route path='/profile' element={<ProfilePage></ProfilePage>} />
                  <Route path='/profile/:id' element={<ProfilePage></ProfilePage>} />
                  <Route element={<ProtectedManagerRoutes />}>
                    <Route path='/roster' element={<RosterPage></RosterPage>} />
                  </Route>
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </UserProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
