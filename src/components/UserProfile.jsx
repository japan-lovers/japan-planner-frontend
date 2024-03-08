import { useContext, useEffect, useState } from "react";
import tripsService from "../services/trip.service";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";

function UserProfile(props) {
  const { user, id } = props;

  const [userTrips, setUserTrips] = useState(null);
  const [nationalities, setNationalities] = useState([]);
  const [editable, changleEditable] = useState(false);

  const { logOutUser } = useContext(AuthContext);

  const getUserTrips = () => {
    tripsService
      .getUserTrips(id)
      .then((response) => {
        console.log(response.data);
        setUserTrips(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserTrips();

    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((response) => {
        const allNationalities = response.data.map((country) => {
          return country.name.common;
        });

        const sortedNationalities = allNationalities.sort();
        setNationalities(sortedNationalities);
      })
      .catch((error) => console.log(error));
  }, []);

  const changeEditable = () => {
    if (!editable) {
      setEditable(!editable);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="flex w-profile justify-between mx-4">
          <div className="flex items-center">
            <img
              className="rounded-full w-32 h-32 border-4 border-white shadow"
              src={user.profilePic}
              alt=""
            />
            <div className="m-6">
              <h1 className="font-bold text-2xl">{user.username}</h1>

              {nationalities.length > 0 && (
                <select className="select select-sm w-full max-w-48">
                  <option value="Citizen of the world">
                    Citizen of the world
                  </option>
                  {nationalities.map((country, index) => {
                    return (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={changeEditable}
              className="btn btn-outline btn-xs mx-2"
            >
              Edit
            </button>
            <button
              onClick={logOutUser}
              className="btn btn-outline btn-xs mx-2"
            >
              Logout
            </button>
          </div>
        </div>
        <textarea className="textarea w-11/12 h-40 m-6" type="text">
          {user.intro}
        </textarea>
      </div>

      <div className="w-profile mx-4">
        <h1 className="font-bold text-2xl">My trips:</h1>
        {userTrips === null ? (
          <span className="loading loading-ring loading-lg mt-20 ml-60"></span>
        ) : userTrips.length > 0 ? (
          <div>
            {userTrips.map((trip) => {
              return (
                <Link key={trip._id} to={`/trips/${trip._id}`}>
                  <div className="h-16 w-full bg-neutral-100 rounded-md flex items-center my-4 p-4">
                    <h3 className="font-semibold text-sm">{trip.name}</h3>
                    <p>First stop: {trip.destinations[0]}</p>
                    <p>
                      From {trip.startDate} to {trip.endDate}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <h2 className="font-thin text-sm m-4">
            You haven't started planning any trips yet
          </h2>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
