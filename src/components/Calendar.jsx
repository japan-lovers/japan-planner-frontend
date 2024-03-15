import React, { useContext, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import tripsService from '../services/trip.service';

import { useNavigate } from 'react-router-dom';
import NoneEditDayInCalendar from './NoneEditDayInCalendar';

export default function Calendar({ id }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState({});
  const [itemsState, setItemsState] = useState(items);

  const [activities, setActivities] = useState();
  const [editable, setEditable] = useState(false);

  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [destionations, setDestionations] = useState();

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
        setDestionations(response.data.destinations);
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
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col basis-3/4">
            <div className="flex w-10/12 justify-between">
              <div className="ml-2 flex flex-col ">
                <h1 className="font-bold text-2xl">{name}</h1>

                <p className="mt-1 font-thin text-sm">
                  {new Date(startDate).getDate()}/
                  {new Date(startDate).getMonth() + 1}/
                  {new Date(startDate).getFullYear()} to{' '}
                  {new Date(endDate).getDate()}/
                  {new Date(endDate).getMonth() + 1}/
                  {new Date(endDate).getFullYear()}
                  {/* {trip && datesDiff(trip.startDate, trip.endDate)} days of
                  travel, I am going to {trip?.destinations.map((dest) => dest)} */}
                </p>

                <p className="mt-1 font-thin text-sm">
                  {trip?.destinations.map((dest) => dest)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap basis-3/4">
              {Object.keys(itemsState).map(
                (key, index) =>
                  key !== 'favActivities' && (
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
        </div>
        <div className="container p-10"></div>
      </div>
    </div>
  );
}
