import { createBrowserRouter, RouterProvider, Router, Route , Routes} from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { AddNewTrip } from "./pages/AddNewTrip/AddNewTrip";
import { ShowAllTrips } from "./pages/Trips/tripsPage"
import { Dashboard } from "./pages/Dashboard/Dashboard";
// import { Navbar } from '/src/components/Navbar/navbar.jsx';


// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />, 
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/trips",
    element: <ShowAllTrips />, 
  },
  {
    path: "/trips/newtrip",
    element: <AddNewTrip />, 
  },

  

]);

const App = () => {
  return (
    <>
      {/* <Router> */}
        {/* <Navbar /> */}
        {/* <Routes>
          <Route path= "/dashboard" element= {<Dashboard />}/>
          <Route path= "/login" element= {<LoginPage />}/>
        </Routes>
      </Router> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;