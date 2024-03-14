import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import userService from "../services/user.service";
import tripsService from "../services/trip.service";
import { AuthContext } from "../context/auth.context";
import CardActivity from "../components/CardActivity";

function UserProfilePage() {
  const { id } = useParams();

  const [userDb, setUserDb] = useState(null);
  const [userTrips, setUserTrips] = useState(null);
  const [nationalities, setNationalities] = useState([]);
  const [editable, setEditable] = useState(false);
  const [favouriteActivities, setFavouriteActivities] = useState([]);

  const [nationality, setNationality] = useState(null);
  const [intro, setIntro] = useState(null);

  const formRef = useRef(null);

  const { logOutUser } = useContext(AuthContext);

  const getUser = () => {
    userService
      .getUser(id)
      .then((response) => {
        setUserDb(response.data);
        setIntro(response.data.intro);
        setNationality(response.data.nationality);
      })
      .catch((error) => console.log(error));
  };

  const getUserTrips = () => {
    tripsService
      .getUserTrips(id)
      .then((response) => {
        setUserTrips(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getFavourites = () => {
    userService
      .getUser(id)
      .then((response) => {
        setFavouriteActivities(response.data.favouriteActivities);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
    getUserTrips();
    getFavourites();

    axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => {
        const allNationalities = response.data.map((country) => {
          return country.name.common;
        });

        const sortedNationalities = allNationalities.sort();
        sortedNationalities.unshift("Citizen of the world");
        setNationalities(sortedNationalities);
      })
      .catch((error) => console.log(error));
  }, []);

  const changeEditable = () => {
    if (!editable) {
      setEditable(!editable);
    }
  };

  const updateHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const requestBody = { intro, nationality };

    userService
      .updateUser(id, requestBody)
      .then()
      .catch((error) => console.log(error));

    setEditable(!editable);
  };

  const updateFavourites = (activity) => {
    let updatedActivities;

    if (favouriteActivities.some((a) => a._id === activity._id)) {
      updatedActivities = favouriteActivities.filter(
        (a) => a._id !== activity._id
      );
    } else {
      updatedActivities = [...favouriteActivities, activity];
    }

    setFavouriteActivities(updatedActivities);
    return updatedActivities;
  };

  return (
    <div className="flex justify-center">
      {userDb === null ? (
        <span className="loading loading-ring loading-lg mt-48"></span>
      ) : (
        <div className="flex flex-col mx-6 max-w-7xl">
          <div className="flex justify-between">
            <div className="flex flex-col items-center w-profile">
              <div className="flex w-profile justify-between ">
                <div className="flex items-center">
                  <img
                    className="rounded-full w-32 h-32 border-4 border-white shadow"
                    src={userDb.profilePic}
                    alt=""
                  />
                  <div className="m-6">
                    <h1 className="font-bold text-2xl">{userDb.username}</h1>
                    {editable ? (
                      nationalities.length > 0 && (
                        <select
                          defaultValue={nationality}
                          className="select select-sm w-full max-w-48"
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          {nationalities.map((country, index) => {
                            return (
                              <option key={index} value={country}>
                                {country}
                              </option>
                            );
                          })}
                        </select>
                      )
                    ) : (
                      <div className="font-light text-sm mt-2 ml-3">
                        {nationality}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {editable ? (
                    <button
                      onClick={updateHandler}
                      className="btn btn-outline btn-xs mx-2"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={changeEditable}
                      className="btn btn-outline btn-xs mx-2"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={logOutUser}
                    className="btn btn-outline btn-xs mx-2"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {editable ? (
                <form ref={formRef} className="w-full">
                  <textarea
                    className="textarea textarea-bordered w-11/12 h-40 m-6"
                    type="text"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                  >
                    {intro}
                  </textarea>
                </form>
              ) : (
                <div className="textarea w-11/12 h-36 m-6">{intro}</div>
              )}
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
                        <div className="h-16 w-full bg-neutral-100 rounded-md flex justify-between items-center my-4 p-4">
                          <h3 className="font-semibold text-md">{trip.name}</h3>
                          <p>{trip.destinations[0]}</p>
                          <p>
                            From {new Date(trip.startDate).getDate()}/
                            {new Date(trip.startDate).getMonth() + 1}/
                            {new Date(trip.startDate).getFullYear()} to{" "}
                            {new Date(trip.endDate).getDate()}/
                            {new Date(trip.endDate).getMonth() + 1}/
                            {new Date(trip.endDate).getFullYear()}
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
          <div>
            <h1 className="font-bold text-2xl">My favourites:</h1>
          </div>
          {favouriteActivities && (
            <div className="flex flex-wrap">
              {favouriteActivities.map((activity) => (
                <CardActivity
                  activity={activity}
                  key={activity._id}
                  updateFavourites={updateFavourites}
                  width="w-full sm:w-45 md:w-30 lg:w-22"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
