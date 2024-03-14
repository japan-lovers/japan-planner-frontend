import { useState, useEffect } from "react";
import tripsService from "../services/trip.service";
import CardTrips from "../components/CardTrips";

function AllTrips() {
  const [trips, setTrips] = useState(null);

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

  function datesDiff(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    const differenceInMillisecondes = Math.abs(date2 - date1);

    const differenceInDays = Math.ceil(
      differenceInMillisecondes / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  }

  return (
    <div className="flex justify-center ">
      <div className="max-w-7xl flex flex-col items-start mb-6">
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
  );
}

export default AllTrips;
