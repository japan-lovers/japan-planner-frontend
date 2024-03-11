import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Homepage from './pages/Homepage';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfilePage from './pages/UserProfilePage';
import AllTrips from './pages/AllTrips';
import TripDetails from './pages/TripDetails';
import AllActivities from './pages/AllActivities';
import ActivityDetails from './pages/ActivityDetails';
import Navbar from './components/Navbar';
import AppDndTest from './components/dnd-comp/AppDndTest';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
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
