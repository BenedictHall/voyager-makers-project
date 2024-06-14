import { Route , Routes, Outlet} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { AddNewTrip } from "./pages/AddNewTrip/AddNewTrip";
import { ShowAllTrips } from "./pages/Trips/tripsPage"
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Navbar } from './components/Navbar/navbar.jsx';
import { SingleTripPage } from "./pages/Trips/singleTripPage.jsx";


// docs: https://reactrouter.com/en/main/start/overview

const AuthLayout = () => (
  <>
    <Navbar/>
    <Outlet />
  </>
)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route element={<AuthLayout />}>
        <Route path="trips">
          <Route path=":tripId" element={<SingleTripPage />} />
          <Route path="newtrip" element={<AddNewTrip />} />
          <Route index element={<ShowAllTrips />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
  );
}

export default App;