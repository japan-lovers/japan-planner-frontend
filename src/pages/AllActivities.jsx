import { useState, useEffect, useContext } from "react";
import activitiesService from "../services/activities.service";
import CardActivity from "../components/CardActivity";

import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";

const category = [
  "Museum",
  "Outdoor",
  "Traditional",
  "Anime",
  "Observation deck",
  "Sports",
  "Theme park",
  "Festival",
];

function AllActivities() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [activities, setActivities] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [favouriteActivities, setFavouriteActivities] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        setActivities(response.data);
        setFilteredActivities(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getFavourites = () => {
    userService
      .getUser(user._id)
      .then((response) => {
        setFavouriteActivities(response.data.favouriteActivities);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActivities();
    if (isLoggedIn) {
      getFavourites();
    }
  }, []);

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

  // FILTERS ================
  const filterByCat = (cat) => {
    if (filterByCategory.includes(cat)) {
      return setFilterByCategory((prev) => prev.filter((el) => el !== cat));
    }
    return setFilterByCategory((prev) => [...prev, cat]);
  };

  useEffect(() => {
    setFilteredActivities(
      filterByCategory.length > 0
        ? activities.filter((el) => filterByCategory.includes(el.category))
        : activities
    );
  }, [filterByCategory]);

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl flex flex-col p-4 ">
        <div className="lg:flex lg:items-center lg:justify-between ml-6 mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Browse all activities
            </h2>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
              {category.map((cat) => {
                return (
                  <button
                    type="button"
                    className={`btn ${
                      filterByCategory.includes(cat)
                        ? "bg-black text-white"
                        : "btn-outline"
                    } active btn-sm`}
                    onClick={() => filterByCat(cat)}
                    key={cat}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-6 ">
          {activities === null ? (
            <span className="loading loading-ring loading-lg mt-48"></span>
          ) : activities.length === 0 ? (
            <div className="font-thin text-sm m-4">No activities available</div>
          ) : (
            filteredActivities.map((activity) => (
              <CardActivity
                activity={activity}
                key={activity._id}
                updateFavourites={updateFavourites}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllActivities;
