
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import RegisterComponent from './Components/Register/RegisterComponent';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// routers
const router = createBrowserRouter([
  {
      path: '/',
      element: <div>Home</div>
  },
  {
      path: '/register',
      element: <RegisterComponent />
  },
  {
      path: '/login',
      element: <LoginComponent />
  },
  
  {
      path: '*',
      element: <div>page not found</div>
  },
])



function App() {

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
