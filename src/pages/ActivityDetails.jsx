import { Link, useNavigate, useParams } from 'react-router-dom';
import activitiesService from '../services/activities.service';
import { useContext, useEffect, useState } from 'react';
import EditActivity from '../components/EditActivity';
import { AuthContext } from '../context/auth.context';
import Map from '../components/Map';

function ActivityDetails() {
  const { id } = useParams();

  const { isLoggedIn } = useContext(AuthContext);

  const [activity, setActivity] = useState(null);
  const [oneDate, setOneDate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [activities, setActivities] = useState(null);
  const [length, setLength] = useState(null);
  const [mapActivity, setMapActivity] = useState([]);

  const navigate = useNavigate();

  const getActivityById = () => {
    activitiesService
      .getActivity(id)
      .then((response) => {
        setActivity(response.data);
        setMapActivity((prev) => [...prev, response.data]);
        response.data.startDate === response.data.endDate && setOneDate(true);
      })
      .catch((error) => console.log(error));
  };

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        const num = response.data.findIndex((actv) => actv._id === id);
        setPosition(num);
        setActivities(response.data);
        setLength(response.data.length);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getActivityById();
    getAllActivities();
  }, [position]);

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousActivity = () => {
    const activityId = activities[position - 1]._id;
    setPosition(position - 1);
    navigate(`/activities/${activityId}`);
  };

  const goToNextActivity = () => {
    const activityId = activities[position + 1]._id;
    setPosition(position + 1);
    navigate(`/activities/${activityId}`);
  };
  console.log(activity?.geometry);
  return (
    <div className="flex  justify-center w-full">
      {activity === null ? (
        <span className="loading loading-ring loading-lg mt-48"></span>
      ) : (
        <div className="max-w-7xl flex p-4 justify-center">
          <EditActivity
            id={activity._id}
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            getActivityById={getActivityById}
          />
          <div className="flex flex-col max-w-7xl p-4 shadow-lg ring-gray-200 rounded-xl">
            <div className="flex justify-between mx-8">
              <div className="flex items-center">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M14 7L9 12L14 17"
                      stroke="#000000"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>
                {position !== 0 && (
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={goToPreviousActivity}
                  >
                    <p className="font-light text-sm">Previous activity</p>
                  </button>
                )}
              </div>
              <div className="flex items-center">
                {position !== length - 1 && (
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={goToNextActivity}
                  >
                    <p className="font-light text-sm">Next activity</p>
                  </button>
                )}
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M10 17L15 12L10 7"
                      stroke="#000000"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>
              </div>
            </div>
            <div className="w-11/12 mt-4 flex flex-col md:flex-row ">
              <div className="md:mx-4 w-full sm:w-2/4">
                <img
                  className="w-full md:mx-4 md:object-cover rounded-xl"
                  src={activity.image}
                  alt={activity.name}
                />
              </div>
              <div className="mt-5 md:ml-6 md:mt-0 w-full md:mx-4 md:w-2/4">
                <h1 className="font-bold text-2xl">{activity.name}</h1>
                <div className="m-2 flex flex-col items-start">
                  <div className="w-11/12 flex items-center justify-between md:items-baseline md:flex-col lg:flex-row md:justify-between lg:items-center">
                    <div className="flex items-center ">
                      <svg
                        version="1.0"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20px"
                        height="20px"
                        viewBox="0 0 64 64"
                        enableBackground="new 0 0 64 64"
                        xmlSpace="preserve"
                        fill="#000000"
                        stroke="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill="#231F20"
                            d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                          ></path>
                        </g>
                      </svg>
                      <h2 className="my-2 mx-1 text-md">{activity.location}</h2>
                    </div>
                    {activity.openAllYear ? (
                      <div className="my-2 font-light text-md">
                        Open all year
                      </div>
                    ) : oneDate ? (
                      <div className="my-2 font-light text-md">
                        {month[new Date(activity.startDate).getMonth()]}{' '}
                        {new Date(activity.startDate).getDate()}th
                      </div>
                    ) : (
                      <div className="my-2 font-light text-md">
                        {month[new Date(activity.startDate).getMonth()]}{' '}
                        {new Date(activity.startDate).getDate()}th to{' '}
                        {month[new Date(activity.endDate).getMonth()]}{' '}
                        {new Date(activity.endDate).getDate()}th
                      </div>
                    )}

                    {activity.free && (
                      <div className="my-2 h-6 text-white bg-gray-900 p-1 text-xs font-semibold rounded-full">
                        FREE
                      </div>
                    )}
                  </div>
                </div>
                <div className="my-5 font-light text-sm">
                  {activity.description}
                </div>
                <div className="mt-8 flex justify-center">
                  {isLoggedIn && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn btn-outline btn-sm mx-2"
                    >
                      Edit activity
                    </button>
                  )}
                  <Link to="/activities">
                    <button className="btn btn-outline btn-sm mx-2">
                      Back to activities
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-center mt-12">
              {activity && (
                <Map
                  activities={mapActivity}
                  zoomStart={10}
                  center={activity.geometry}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityDetails;
