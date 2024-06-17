import { Route , Routes, Outlet} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { AddNewTrip } from "./pages/AddNewTrip/AddNewTrip";
import { ShowAllTrips } from "./pages/Trips/tripsPage"
import { CreateItineraryPage } from "./pages/Itinerary/CreateItineraryPage";

import { Navbar } from './components/Navbar/navbar.jsx';
import { SingleTripPage } from "./pages/Trips/singleTripPage.jsx";
import { FlightTracker } from "./pages/Flights/FlightTracker.jsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";

const AuthLayout = () => (
  <>
    <Navbar/>
    <Outlet />
  </>
)

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
            <Route path="/createitinerary" element={<CreateItineraryPage/>}/>
            <Route path="/flights" element={<FlightTracker/>}/>

          </Routes>
        </div>
    </>
  );
}

export default App;