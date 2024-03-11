import React, { useState } from 'react';
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
import tripsService from '../../services/trip.service';
import activitiesService from '../../services/activities.service';
import DndDraggableCard from './DndDraggableCard';
import DayInCalendar from './DayInCalendar';
import Sidebar from './Sidebar';

export default function AppDndTest({ id }) {
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState({});
  const [itemsState, setItemsState] = useState(items);
  const [activeId, setActiveId] = useState();
  const [activeData, setActiveData] = useState();

  //   ---- CALL TO DATABASE --------------
  const getTrip = () => {
    tripsService
      .getTrip(id)
      .then((response) => {
        const theTrip = response.data;
        const dates = displayDaysBetweenDates(
          theTrip.startDate,
          theTrip.endDate
        );
        dates.forEach((date) =>
          setItems((prevs) => ({
            ...prevs,
            [date]: [],
          }))
        );
        setTrip(theTrip);
      })
      .catch((error) => console.log(error));
  };

  const getFavActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        setItems((prevs) => ({
          ...prevs,
          favActivities: response.data,
        }));
      })
      .catch((error) => console.log(error));
  };

  //  ----- Function to know how many days the trip is ---------------
  function datesDiff(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    const differenceInMillisecondes = Math.abs(date2 - date1);

    const differenceInDays = Math.ceil(
      differenceInMillisecondes / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  }

  //  ----- Function to Display the days of my trip ---------------
  function displayDaysBetweenDates(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    const differenceInMillisecondes = Math.abs(date2 - date1);
    const differenceInDays = Math.ceil(
      differenceInMillisecondes / (1000 * 60 * 60 * 24)
    );

    const days = [];

    for (let i = 0; i <= differenceInDays; i++) {
      const currentDate = new Date(date1);
      currentDate.setDate(date1.getDate() + i);
      days.push(currentDate);
    }

    return days;
  }

  useEffect(() => {
    getTrip();
    getFavActivities();
    console.log(items);
  }, []);

  useEffect(() => setItemsState(items), [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  console.log(items);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="basis-1/4">
            {' '}
            {Object.keys(itemsState).map(
              (key) =>
                key === 'favActivities' && (
                  <Sidebar
                    id="favActivities"
                    items={items.favActivities}
                    key={key}
                  />
                )
            )}
          </div>
          <div className="flex flex-col basis-3/4">
            <div className="ml-2">
              <h1 className="text-2xl ">{trip?.name}</h1>
              <p className="ml-2 italic">
                {' '}
                {trip && datesDiff(trip.startDate, trip.endDate)} days of
                travel, I am going to {trip?.destinations.map((dest) => dest)}
              </p>
            </div>
            <div className="flex flex-wrap basis-3/4">
              {Object.keys(itemsState).map(
                (key) =>
                  key !== 'favActivities' && (
                    <DayInCalendar id={key} items={items[key]} key={key} />
                  )
              )}
            </div>
          </div>
          <DragOverlay>
            {activeId ? (
              <DndDraggableCard id={activeId} name={activeData.name} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <div className="container p-10">
        <ul>
          <li>
            {' '}
            my Activities are : {trip?.activities.map(
              (activity) => activity
            )}{' '}
          </li>{' '}
        </ul>
      </div>
    </div>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => {
      const item = items[key];
      return item.some((obj) => obj._id === id);
    });
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id, data } = active;

    setActiveId(id);
    setActiveData(
      items[data.current.sortable.containerId].find((obj) => obj._id === id)
    );
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.map((obj) => obj._id).indexOf(id);
      const overIndex = overItems.map((obj) => obj._id).indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect?.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item._id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer]
      .map((obj) => obj._id)
      .indexOf(active.id);
    const overIndex = items[overContainer]
      .map((obj) => obj._id)
      .indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
    setActiveData(null);
  }
}
