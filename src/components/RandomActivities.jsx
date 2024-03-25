import React, { useEffect, useState } from "react";
import activitiesService from "../services/activities.service";
import CardActivity from "./CardActivity";

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
    <div className="mt-20 w-full flex flex-col items-start">
      <h2 className="mx-12 text-lg font-semibold leading-7 mb-2 text-gray-900 sm:truncate sm:tracking-tight">
        Browse our activities
      </h2>
      <div className="flex justify-center flex-wrap gap-6 ">
        {randomActivities === null ? (
          <span className="loading loading-ring loading-lg mt-48"></span>
        ) : (
          randomActivities.map((activity) => (
            <CardActivity
              activity={activity}
              key={activity._id}
              width="w-full sm:w-45 md:w-30 lg:w-22 rounded-xl"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RandomActivities;
