import { useState, useEffect } from "react";
import tripsService from "../services/trip.service";
import CardTrips from "../components/CardTrips";

function AllTrips() {
  const [trips, setTrips] = useState(null);

  const getAllTrips = () => {
    tripsService
      .getAllTrips()
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl flex flex-col items-start mb-6 p-4">
        <h2 className="text-2xl font-bold leading-7 ml-2 mb-2 text-gray-900 sm:truncate sm:tracking-tight">
          Explore trips
        </h2>
        <div className="w-full flex flex-col items-center">
          {trips === null ? (
            <span className="loading loading-ring loading-lg mt-48"></span>
          ) : trips.length === 0 ? (
            <div className="font-thin text-sm m-4">
              No trips have been created yet
            </div>
          ) : (
            trips.map((trip) => <CardTrips tripData={trip} key={trip._id} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTrips;
