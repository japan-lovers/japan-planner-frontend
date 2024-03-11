import { useState, useEffect } from 'react';
import tripsService from '../services/trip.service';
import CardTrips from '../components/CardTrips';

function AllTrips() {
  const [trips, setTrips] = useState([]);

  const getAllTrips = () => {
    tripsService
      .getAllTrips()
      .then((response) => {
        console.log(response);
        setTrips(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div>
      {trips.length === 0 ? (
        <div>Loading...</div>
      ) : (
        trips.map((trip) => <CardTrips tripData={trip} key={trip._id} />)
      )}
    </div>
  );
}

export default AllTrips;
