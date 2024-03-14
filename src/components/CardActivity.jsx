import React, { useContext, useEffect, useState } from 'react';
import userService from '../services/user.service';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { AuthContext } from '../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';

function CardActivity({ activity, updateFavourites, width }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [isFavourite, setIsFavourite] = useState(false);

  const navigate = useNavigate();

  if (isLoggedIn) {
    useEffect(() => {
      userService
        .getUser(user._id)
        .then((response) => {
          response.data.favouriteActivities.forEach((elm) => {
            if (elm._id === activity._id) {
              setIsFavourite(true);
              return;
            }
            return;
          });
        })
        .catch((error) => console.log(error));
    }, []);
  }

  const handleAddToFavourites = () => {
    if (isLoggedIn) {
      setIsFavourite(!isFavourite);
      const favouriteActivities = updateFavourites(activity);

      const requestBody = { favouriteActivities };

      userService
        .updateUser(user._id, requestBody)
        .then()
        .catch((error) => console.log(error));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`${width} shadow-lg`}>
      <CardHeader floated={false} color="blue-gray">
        <Link to={`/activities/${activity._id}`}>
          <img
            className="w-full h-64 md:h-48 md:w-64 object-cover"
            src={activity.image}
            alt={activity.name}
          />
        </Link>
        <div>
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />

          {activity.free && (
            <Typography
              color="white"
              className="!absolute top-2 left-2 bg-gray-900 px-2 text-xs font-semibold rounded-full"
            >
              FREE
            </Typography>
          )}
          {!isLoggedIn ? (
            ''
          ) : isFavourite ? (
            <IconButton
              onClick={handleAddToFavourites}
              size="sm"
              color="white"
              variant="text"
              className="!absolute top-2 right-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </IconButton>
          ) : (
            <IconButton
              onClick={handleAddToFavourites}
              size="sm"
              variant="text"
              color="white"
              className="!absolute top-2 right-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </IconButton>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-semibold text-lg"
          >
            {activity.name}
          </Typography>

          {/* <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            24
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-red-700"
            >
              <path
                fillRule="evenodd"
                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                clipRule="evenodd"
              />
            </svg>
          </Typography> */}
        </div>
        <span className="text-xs font-medium">{activity.location}</span>
        <Typography color="gray" className="text-sm mt-2">
          {activity.description.slice(0, 95)}...
        </Typography>
        <div className="group mt-4 flex justify-between items-center gap-3">
          <Typography
            color="white"
            className="px-2 rounded-full text-xs h-4 bg-gray-900 font-white font-semibold"
          >
            {activity.category}
          </Typography>
          <Link to={`/activities/${activity._id}`}>
            <button
              color="gray"
              className="btn btn-xs btn-ghost text-sm font-semibold"
            >
              View details
            </button>
          </Link>
          {/* <Tooltip content="$129 per night">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path
                  fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd"
                />
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="Free wifi">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Tooltip> */}
        </div>
      </CardBody>
      {/* <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true}>
          Reserve
        </Button>
      </CardFooter> */}
    </div>
  );
}

export default CardActivity;
