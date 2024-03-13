import { useParams } from "react-router-dom";
import activitiesService from "../services/activities.service";
import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";

function ActivityDetails() {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    activitiesService
      .getActivity(id)
      .then((response) => {
        console.log(response.data);
        setActivity(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-center">
      {activity === null ? (
        <span className="loading loading-ring loading-lg mt-48"></span>
      ) : (
        <div className="flex max-w-7xl mx-4 p-6 shadow-md rounded-xl">
          <div className="mx-4 w-profile ">
            <div className="">
              <img
                className="w-imgw h-imgh object-cover rounded-xl"
                src={activity.image}
                alt={activity.name}
              />
            </div>
          </div>
          <div className="mx-4 w-profile">
            <h1 className="font-bold text-2xl">{activity.name}</h1>
            <h2 className="my-2  text-md">{activity.location}</h2>
            <div className="my-5 font-light text-sm">
              {activity.description}
            </div>
            <div>
              <div className="my-2 font-light text-sm">{activity.category}</div>
              <div className="my-2 font-light text-sm">{activity.address}</div>
              {activity.openAllYear ? (
                <div className="my-2 font-light text-sm">Open all year</div>
              ) : (
                <div className="my-2 font-light text-sm">
                  Only open from {activity.startDate} to {activity.endDate}
                </div>
              )}
              {activity.free && <div>FREE</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityDetails;
