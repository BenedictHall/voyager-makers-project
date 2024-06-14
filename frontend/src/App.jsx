import { Route , Routes} from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { AddNewTrip } from "./pages/AddNewTrip/AddNewTrip";
import { ShowAllTrips } from "./pages/Trips/tripsPage"

import { Navbar } from './components/Navbar/navbar.jsx';

import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { FlightTracker } from "./pages/Transport/FlightTracker.jsx";

const App = () => {
  return (
    <>
        <div className = "App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/trips" element={<ShowAllTrips/>}/>
            <Route path="/trips/newtrip" element={<AddNewTrip/>}/>
            <Route path="/flights" element={<FlightTracker/>}/>

          </Routes>
        </div>
    </>
  );
};

export default App;