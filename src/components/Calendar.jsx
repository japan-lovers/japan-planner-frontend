import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import tripsService from "../services/trip.service";
import NoneEditDayInCalendar from "./NoneEditDayInCalendar";
import { Link } from "react-router-dom";

export default function Calendar({ id }) {
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState({});
  const [itemsState, setItemsState] = useState(items);

  const [activities, setActivities] = useState();
  const [editable, setEditable] = useState(false);

  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [destinations, setDestinations] = useState();
  const [userCreator, setUserCreator] = useState(null);

  //   ---- CALL TO DATABASE --------------

  const renderActivityByDate = (date, activities) => {
    return activities
      .filter((activity) => activity.date === date)
      .map((activity) => activity.activity);
  };

  const getTrip = () => {
    tripsService
      .getTrip(id)
      .then((response) => {
        setName(response.data.name);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setDestinations(response.data.destinations);
        const { activities, ...theTrip } = response.data;
        const dates = displayDaysBetweenDates(
          theTrip.startDate,
          theTrip.endDate
        );
        dates.forEach((date) =>
          setItems((prevs) => ({
            ...prevs,
            [date]: renderActivityByDate(date, activities),
          }))
        );
        setActivities(activities);
        setTrip(theTrip);
        setUserCreator(response.data.userId);
      })
      .catch((error) => console.log(error));
  };

  //  ----- Function to Display the days of my trip ---------------
  function displayDaysBetweenDates(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    const differenceInMilliseconds = Math.abs(date2 - date1);
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    const days = [];

    // Loop through each day between the two dates
    for (let i = 0; i <= differenceInDays; i++) {
      const currentDate = new Date(date1);
      currentDate.setDate(date1.getDate() + i);
      days.push(currentDate.toISOString()); // Store the date in ISO string format
    }

    return days;
  }

  useEffect(() => {
    getTrip();
  }, []);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  return (
    <div className="flex justify-center ">
      {trip === null ? (
        <span className="loading loading-ring loading-lg mt-48"></span>
      ) : (
        <div className="mt-4 flex flex-col w-11/12 max-w-7xl">
          <div className="ml-2 flex justify-between w-11/12">
            <div className="ml-2 flex flex-col ">
              <h1 className="font-bold text-2xl">{name}</h1>

              <p className="mt-1 font-thin text-sm">
                {new Date(startDate).getDate()}/
                {new Date(startDate).getMonth() + 1}/
                {new Date(startDate).getFullYear()} to{" "}
                {new Date(endDate).getDate()}/{new Date(endDate).getMonth() + 1}
                /{new Date(endDate).getFullYear()}
                {/* {trip && datesDiff(trip.startDate, trip.endDate)} days of
        travel, I am going to {trip?.destinations.map((dest) => dest)} */}
              </p>

              <p className="mt-1 font-thin text-sm">{destinations}</p>
            </div>

            <Link to={`/user/${userCreator._id}`}>
              <button className="btn btn-xs text-md">
                {userCreator.username}
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap">
            {Object.keys(itemsState).map(
              (key, index) =>
                key !== "favActivities" && (
                  <NoneEditDayInCalendar
                    id={key}
                    items={items[key]}
                    key={key}
                    day={index + 1}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
