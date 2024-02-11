import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginComponent from "./Components/Login/LoginComponent";
import RegisterComponent from "./Components/Register/RegisterComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeComponent from "./Components/DashBoard/Home/HomeComponent";

// index.js or App.js
import axiosInstance from "./auth/axiosInstance";
import Dashboard from "./Components/DashBoard/DashBoard";
import Profile from "./Components/DashBoard/Profile/Profile";

axiosInstance.defaults.baseURL = "http://localhost:4100/api"; // Your API base URL

// routers
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/",
        element: <HomeComponent />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterComponent />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },

  {
    path: "*",
    element: <div>page not found</div>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
