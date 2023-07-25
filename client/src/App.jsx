import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { AdminHistoryProvider } from './context/AdminHistoryContext.jsx'
import { FoodProvider } from './context/FoodContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { IngredientProvider } from './context/IngredientContext.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import TaskFormPage from './pages/TaskFormPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'
import RosterPage from './pages/RosterPage.jsx'
import ProtectedManagerRoutes from './ProtectedManagerRoutes.jsx'
import ManagerPage from './pages/ManagerPage.jsx'
import EditUser from './pages/EditUser.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage.jsx'
import TakeOrder from './pages/ERP/TakeOrder.jsx'
import CreateFood from './pages/ERP/CreateFood.jsx'
import OrdersList from './pages/ERP/OrdersList.jsx'
import ActiveOrders from './pages/ERP/ActiveOrders.jsx'
import CreateIngredient from './pages/ERP/CreateIngredient.jsx'
import CreateFoodAlternative from './pages/ERP/CreateFoodAlternative.jsx'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <UserProvider>
          <AdminHistoryProvider>
            <FoodProvider>
              <OrderProvider>
                <IngredientProvider>
                <BrowserRouter>
                  <main className='container mx-auto px-10'>
                    <Navbar></Navbar>
                    <Routes>
                      <Route path='/' element={<HomePage />} />
                      <Route path='/login' element={<LoginPage />} />

                      <Route element={<ProtectedRoute />}>
                        <Route path='/tasks' element={<TasksPage></TasksPage>} />
                        <Route path='/add-task' element={<TaskFormPage></TaskFormPage>} />
                        <Route path='/tasks/:id' element={<TaskFormPage></TaskFormPage>} />
                        <Route path='/profile' element={<ProfilePage></ProfilePage>} />
                        <Route path='/profile/:id' element={<ProfilePage></ProfilePage>} />
                        <Route element={<ProtectedManagerRoutes />}>
                          <Route path='/takeorder' element={<TakeOrder />} />
                          <Route path='/createfood' element={<CreateFoodAlternative />} />
                          <Route path='/orderslist' element={<OrdersList />} />
                          <Route path='/activeorders' element={<ActiveOrders />} />
                          <Route path='/createingredient' element={<CreateIngredient />} />
                          <Route path='/createingredient' element={<CreateIngredient />} />
                          

                          <Route path='/roster' element={<RosterPage></RosterPage>} />
                          <Route path='/manager' element={<ManagerPage></ManagerPage>} />
                          <Route path='/register' element={<RegisterPage></RegisterPage>} />
                          <Route path='/editprofile/:id' element={<EditUser></EditUser>} />
                          <Route path='/changepassword/:id' element={<ChangePasswordPage></ChangePasswordPage>} />
                          <Route path='/changepassword/' element={<ChangePasswordPage></ChangePasswordPage>} />

                        </Route>
                      </Route>
                    </Routes>
                  </main>
                </BrowserRouter>
                </IngredientProvider>
              </OrderProvider>
            </FoodProvider>
          </AdminHistoryProvider>
        </UserProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
