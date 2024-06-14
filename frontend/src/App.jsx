import {  Route , Routes} from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { AddNewTrip } from "./pages/AddNewTrip/AddNewTrip";
import { ShowAllTrips } from "./pages/Trips/tripsPage"
import { Budget } from "./pages/Budget/budgetPage"
import { Navbar } from './components/Navbar/navbar.jsx';
import { DashboardPage } from "./pages/Dashboard/DashboardPage";


// docs: https://reactrouter.com/en/main/start/overview
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />, 
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//   },
//   {
//     path: "/trips",
//     element: <ShowAllTrips />, 
//   },
//   {
//     path: "/trips/newtrip",
//     element: <AddNewTrip />, 
//   },

  

// ]);

const App = () => {
  return (
    <>
      {/* <Router> */}
        {/* <Navbar /> */}
        {/* <Routes>
          <Route path= "/dashboard" element= {<Dashboard />}/>
          <Route path= "/login" element= {<LoginPage />}/>
        </Routes> */}
      {/* </Router> */}
      {/* <RouterProvider router={router} />
        <Navbar/> */}
        <div className = "App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/trips" element={<ShowAllTrips/>}/>
            <Route path="/trips/newtrip" element={<AddNewTrip/>}/>
            <Route path="/budget" element={<Budget/>}/>

          </Routes>
        </div>
    </>
  );
};

export default App;