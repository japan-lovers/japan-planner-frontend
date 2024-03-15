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
import { AuthContext } from '../../context/auth.context';
import tripsService from '../../services/trip.service';
import activitiesService from '../../services/activities.service';
import userService from '../../services/user.service';
import DndDraggableCard from './DndDraggableCard';
import DayInCalendar from './DayInCalendar';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import Calendar from '../Calendar';

export default function AppDndTest({ id }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState({});
  const [itemsState, setItemsState] = useState(items);
  const [activeId, setActiveId] = useState();
  const [activeData, setActiveData] = useState();
  const [activities, setActivities] = useState();
  const [favs, setFavs] = useState();
  const [editable, setEditable] = useState(false);

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [destinations, setDestinations] = useState('');
  const [focusedInput, setFocusedInput] = useState('startDate');

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      })
      .catch((error) => console.log(error));
  };

  const getActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        // console.log("FavActivities", response.data);
        // console.log("do I have", activities);

        setItems((prevs) => ({
          ...prevs,
          favActivities: response?.data.filter(
            (activity) =>
              !activities
                ?.map((activity) => activity.activity._id)
                .includes(activity._id)
          ),
        }));
      })
      .catch((error) => console.log(error));
  };

  // ----- GET THE FAVOURITES IDS ----
  const getFavs = () => {
    userService
      .getUser(user?._id)
      .then((response) => {
        setFavs(response.data.favouriteActivities.map((el) => el._id));
      })
      .catch((error) => console.log(error));
  };

  const updateTripActivities = (newActiv) => {
    const requestBody = { activities: newActiv };
    tripsService
      .updateTrip(id, requestBody)
      .then((response) => {
        console.log('successful change of the for');
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

  const createNewActivities = (activities, activeId, overContainer) => {
    const newActivities = [...activities];
    //CHECK IF WE MOVE IT IN THE SIDEBAR AND DELETE IT FROM ACTIVITIES
    if (overContainer === 'favActivities') {
      return newActivities.filter(
        (activity) => activity.activity._id !== activeId
      );
    }

    //CHECK IF WE MOVE IT FROM THE SIDEBAR AND WE ADD IT TO ACTIVITIES
    if (
      !newActivities.filter((activity) => activity.activity._id === activeId)
        .length > 0
    ) {
      return [...newActivities, { activity: activeData, date: overContainer }];
    }

    // OTHERWISE WE CHANGING THE DATE OF THE ACTIVITY INSIDE ACTIVITIES
    return newActivities.map((activity) => {
      if (activity.activity._id === activeId) {
        return { ...activity, date: overContainer };
      }
      return activity;
    });
  };

  useEffect(() => {
    getTrip();
  }, []);

  useEffect(() => {
    setItemsState(items);
    getFavs();
  }, [items]);

  useEffect(() => {
    getActivities();
  }, [activities]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDelete = () => {
    tripsService
      .deleteTrip(id)
      .then(() => navigate('/trips'))
      .catch((error) => console.log(error));
  };

  const updateHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const requestBody = { name, destinations, startDate, endDate };
    console.log(requestBody);

    tripsService
      .updateTrip(id, requestBody)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    setEditable(!editable);
  };

  const isYours = (contentId, userId) => {
    return contentId === userId;
  };

  return (
    <>
      {isLoggedIn && isYours(trip?.userId, user._id) ? (
        <div className="flex flex-col">
          <div className="flex justify-center">
            {trip === null ? (
              <span className="loading loading-ring loading-lg mt-48"></span>
            ) : (
              <div>
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
                              favs={favs}
                            />
                          )
                      )}
                    </div>
                    <div className="flex flex-col basis-3/4">
                      <div className="flex w-10/12 justify-between">
                        <div className="ml-2 flex flex-col ">
                          {editable ? (
                            <input
                              type="text"
                              value={name}
                              placeholder={name}
                              onChange={(e) => setName(e.target.value)}
                              className="input input-bordered input-sm font-bold text-2xl"
                            />
                          ) : (
                            <h1 className="font-bold text-2xl">{name}</h1>
                          )}
                          {editable ? (
                            <input
                              type="text"
                              value={destionations}
                              placeholder={destionations}
                              onChange={(e) => setDestionations(e.target.value)}
                              className="input input-bordered input-xs text-sm"
                            />
                          ) : (
                            <p className="mt-1 font-thin text-sm">
                              {trip?.destinations.map((dest) => dest)}
                            </p>
                          )}

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
                            {destinations}
                          </p>
                        </div>
                        <div>
                          {editable ? (
                            <button
                              onClick={updateHandler}
                              className="btn btn-outline btn-xs mx-2"
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (!editable) {
                                  setEditable(!editable);
                                }
                              }}
                              className="btn btn-outline btn-xs mx-2"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => setOpen(true)}
                            className="btn btn-outline btn-xs mx-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap basis-3/4">
                        {Object.keys(itemsState).map(
                          (key, index) =>
                            key !== 'favActivities' && (
                              <DayInCalendar
                                id={key}
                                items={items[key]}
                                key={key}
                                favs={favs}
                                day={index + 1}
                              />
                            )
                        )}
                      </div>
                    </div>
                    <DragOverlay>
                      {activeId ? (
                        <DndDraggableCard
                          id={activeId}
                          name={activeData.name}
                        />
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                </div>
                <div className="container p-10"></div>
                <DeleteModal
                  open={open}
                  handleClose={() => setOpen(false)}
                  handleDelete={handleDelete}
                />
              </div>
            )}{' '}
          </div>{' '}
        </div>
      ) : (
        <Calendar id={id} />
      )}
    </>
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
    // console.log("ACTIVE ID", activeId);
    // console.log("OVERCONTAINER", overContainer);

    const newActiv = createNewActivities(activities, activeId, overContainer);
    setActivities(newActiv);
    updateTripActivities(newActiv);
    setActiveId(null);
    setActiveData(null);
  }
}
