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
  const { isLoggedIn, user } = useContext(AuthContext);

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
        <div className="flex flex-col w-full mx-6 max-w-7xl">
          <div className="mt-5 flex flex-col lg:flex-row justify-between">
            <div className="w-full flex flex-col items-center lg:w-2/4">
              <div className="flex w-full lg:w-11/12 justify-between ">
                <div className="flex items-start lg:items-center">
                  <img
                    className="rounded-full w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow"
                    src={userDb.profilePic}
                    alt=""
                  />
                  <div className="m-6 ">
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
                <div className="space-y-2 md:space-y-0 flex flex-col items-end md:flex-row md:items-start">
                  {editable ? (
                    <button
                      onClick={updateHandler}
                      className="btn btn-outline btn-xs mx-2"
                    >
                      Update
                    </button>
                  ) : isLoggedIn && user?._id === id ? (
                    <button
                      onClick={changeEditable}
                      className="btn btn-outline btn-xs mx-2"
                    >
                      Edit
                    </button>
                  ) : (
                    ""
                  )}

                  {isLoggedIn && user?._id === id ? (
                    <button
                      onClick={logOutUser}
                      className="btn btn-outline btn-xs mx-2"
                    >
                      Logout
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {editable ? (
                <form ref={formRef} className="w-full">
                  <textarea
                    className="textarea textarea-bordered w-11/12 my-4 mx-6"
                    type="text"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                  >
                    {intro}
                  </textarea>
                </form>
              ) : (
                <div className="textarea w-11/12 h-30 sm:h-20 my-4 mx-6">
                  {intro}
                </div>
              )}
            </div>

            <div className="w-full lg:w-2/4">
              <h1 className="font-bold text-2xl">
                {isLoggedIn && user?._id === id ? "My trips:" : "Trips:"}
              </h1>
              {userTrips === null ? (
                <span className="loading loading-ring loading-lg mt-20 ml-60"></span>
              ) : userTrips.length > 0 ? (
                <div>
                  {userTrips.map((trip) => {
                    return (
                      <Link key={trip._id} to={`/trips/${trip._id}`}>
                        <div className="h-16 w-full ring-gray-200 shadow-md rounded-md flex justify-between items-center my-4 p-4">
                          <h3 className="font-semibold text-md">{trip.name}</h3>
                          <p>{trip.destinations}</p>
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
          <div className="max-w-7xl">
            <h1 className="lg:mx-10 mt-5 lg:mt-0 font-bold text-2xl">
              My favourites:
            </h1>

            {favouriteActivities.length === 0 ? (
              <div className="flex justify-center my-10 font-thin text-sm">
                You don't have any activities added to favourites
              </div>
            ) : (
              <div className="flex flex-wrap justify-center flex-wrap gap-6 ">
                {favouriteActivities.map((activity, index) => (
                  <CardActivity
                    activity={activity}
                    key={activity._id}
                    updateFavourites={updateFavourites}
                    width="w-full sm:w-45 md:w-30 lg:w-22 rounded-xl"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
