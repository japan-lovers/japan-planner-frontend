import { useState, useEffect } from "react";
import tripsService from "../services/trip.service";
import CardTrips from "../components/CardTrips";

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
    <div className="flex justify-center">
      <div className="max-w-7xl flex flex-col items-start">
        {trips.length === 0 ? (
          <div>Loading...</div>
        ) : (
          trips.map((trip) => (
            <CardTrips name={trip.destinations} key={trip._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default AllTrips;
