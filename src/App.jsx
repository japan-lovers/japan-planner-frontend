import { Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import AllTrips from "./pages/AllTrips";
import TripDetails from "./pages/TripDetails";
import AllActivities from "./pages/AllActivities";
import ActivityDetails from "./pages/ActivityDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/trips" element={<AllTrips />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/activities/:id" element={<ActivityDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
