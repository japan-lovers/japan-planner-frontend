import { useState, useEffect } from 'react';
import activitiesService from '../services/activities.service';
import CardActivity from '../components/CardActivity';

function AllActivities() {
  const [activities, setActivities] = useState([]);

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
    <div className="flex flex-col p-4">
      <div className="lg:flex lg:items-center lg:justify-between ml-6 mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Back End Developer
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View
                </button>
              </span>
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View
                </button>
              </span>
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 ">
        {activities.length == 0 ? (
          <div>Loading...</div>
        ) : (
          activities.map((activity) => (
            <CardActivity name={activity.name} key={activity._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default AllActivities;
