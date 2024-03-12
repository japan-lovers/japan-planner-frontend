import { useState, useEffect } from "react";
import activitiesService from "../services/activities.service";
import CardActivity from "../components/CardActivity";

function AllActivities() {
  const [activities, setActivities] = useState(null);

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl flex flex-col p-4 ">
        <div className="lg:flex lg:items-center lg:justify-between ml-6 mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Browse all activities
            </h2>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
              <button type="button" className="btn btn-outline btn-sm">
                View
              </button>
              <button type="button" className="btn btn-outline btn-sm">
                View
              </button>
              <button type="button" className="btn btn-outline btn-sm">
                View
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-6 ">
          {activities === null ? (
            <span className="loading loading-ring loading-lg mt-48"></span>
          ) : activities.length === 0 ? (
            <div className="font-thin text-sm m-4">No activities available</div>
          ) : (
            activities.map((activity) => (
              <CardActivity activity={activity} key={activity._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllActivities;
