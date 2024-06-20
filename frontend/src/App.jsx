import { Route , Routes, Outlet} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { AddNewTrip } from "./pages/AddNewTrip/AddNewTrip";

import { ShowAllTrips } from "./pages/Trips/tripsPage";
import { Notifications } from "./pages/Notifications/Notifications.jsx";
import { CreateItineraryPage } from "./pages/Itinerary/CreateItineraryPage";

import { Navbar } from './components/Navbar/navbar.jsx';
import { SingleTripPage } from "./pages/Trips/singleTripPage.jsx";
import { FlightTracker } from "./pages/Flights/FlightTracker.jsx";
import { DashboardPage } from "./pages/Dashboard/DashboardPage.jsx";
import { BudgetPage } from "./pages/Budget/BudgetPage.jsx";
import { ExpensePage } from "./pages/Expense/ExpensePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';




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
          <Route path=":tripId/createitinerary" element={<CreateItineraryPage />} />
          <Route path=":tripId/budget" element={<BudgetPage />} />
          <Route path=":tripId/budget/:budgetId" element={<ExpensePage />} />
          <Route path="newtrip" element={<AddNewTrip />} />
          <Route index element={<ShowAllTrips />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/notifications" element={<Notifications />}/>

      </Route>
    </Routes>
  );
}

export default App;