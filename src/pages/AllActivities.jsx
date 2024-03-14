import { useState, useEffect, useContext } from "react";
import activitiesService from "../services/activities.service";
import CardActivity from "../components/CardActivity";

import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import CreateActivity from "../components/CreateActivity";

function AllActivities() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [byCategory, setByCategory] = useState(false);

  const [activities, setActivities] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [favouriteActivities, setFavouriteActivities] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [categories, setCategories] = useState([]);

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
    activitiesService
      .getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFilteredActivities(
      filterByCategory.length > 0
        ? activities.filter((el) => filterByCategory.includes(el.category))
        : activities
    );
  }, [filterByCategory]);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl flex flex-col p-4">
        <CreateActivity
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          getAllActivities={getAllActivities}
        />
        <div className="lg:flex lg:items-center lg:justify-between mx-2 mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 mb-2 text-gray-900 sm:truncate sm:tracking-tight">
              All activities
            </h2>
            <div className="max-w-7xl mt-1 flex flex-col sm:flex-wrap sm:flex-wrap ">
              <div className="flex  items-start justify-between sm:items-end">
                <div className="space-y-2 sm:space-x-2 my-2 flex flex-col sm:flex-row items-baseline">
                  <button
                    onClick={() => setByCategory(!byCategory)}
                    className={`btn btn-sm ${
                      byCategory ? "bg-black text-white" : "btn-outline"
                    } active btn-sm`}
                  >
                    Browse by category
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Browse in map
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <h3 className="w-32 md:w-48 text-right text-sm">
                    Don't see what you plan to do?
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-outline btn-sm mt-2 sm:mt-1"
                  >
                    Add your activity
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                {byCategory && (
                  <div className="mt-4 md:mt-3 lg:mt-1 xl:mt-0 w-11/12 lg:w-full flex flex-wrap items-baseline justify-center lg:justify-start space-y-2 space-x-2">
                    {categories.map((cat) => {
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
                )}
              </div>
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
                width="w-full sm:w-45 md:w-30 lg:w-22"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllActivities;
