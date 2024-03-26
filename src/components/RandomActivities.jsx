import React, { useEffect, useState } from "react";
import activitiesService from "../services/activities.service";
import CardActivity from "./CardActivity";
import { Link } from "react-router-dom";

function RandomActivities() {
  const [randomActivities, setRandomActivities] = useState(null);

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        const randomNumber = Math.floor(
          Math.random() * (response.data.length - 4)
        );

        const act = [
          response.data[randomNumber],
          response.data[randomNumber + 1],
          response.data[randomNumber + 2],
          response.data[randomNumber + 3],
        ];

        setRandomActivities(act);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div className="mt-52 md:mt-40 lg:mt-20 w-full flex flex-col items-center">
      <div className="flex justify-between w-11/12">
        <h2 className="text-lg font-semibold leading-7 mb-2 text-gray-900 sm:truncate sm:tracking-tight">
          Browse our activities
        </h2>
        <Link to="/activities">
          <button className="btn btn-sm btn-ghost font-normal">See all</button>
        </Link>
      </div>
      <div className="flex justify-center flex-wrap gap-6 ">
        {randomActivities === null ? (
          <span className="loading loading-ring loading-lg mt-48"></span>
        ) : (
          randomActivities.map((activity) => (
            <CardActivity
              activity={activity}
              key={activity._id}
              width="w-full sm:w-45 md:w-22 rounded-xl"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RandomActivities;
