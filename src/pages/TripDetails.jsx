import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tripsService from '../services/trip.service';
import activitiesService from '../services/activities.service';

import Sidebar from '../components/Sidebar';
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

// =====HELP UNDERSTAND DND ACTIONS ==============
const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};
//   END HELP ---

function TripDetails() {
  const [trip, setTrip] = useState(null);
  const { id } = useParams();
  const [columns, setColumns] = useState(null);
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //   ---- CALL TO DATABASE --------------
  const getTrip = () => {
    tripsService
      .getTrip(id)
      .then((response) => {
        const theTrip = response.data;
        console.log(theTrip);
        setTrip(theTrip);
      })
      .catch((error) => console.log(error));
  };

  const getFavActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        console.log(response);
        setColumns((prevs) => ({ ...prevs, favActivities: response.data }));
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

  useEffect(() => {
    getTrip();
    getFavActivities();
  }, []);

  return (
    <DndContext
      announcements={defaultAnnouncements}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex">
        {columns && (
          <Sidebar id="favActivities" items={columns?.favActivities} />
        )}
        <div className="container p-10">
          <ul>
            <li>{trip?.name}</li>
            <li>
              {trip && datesDiff(trip.startDate, trip.endDate)} days of travel
            </li>
            <li>I am going to {trip?.destinations.map((dest) => dest)}</li>
            <li>
              my Activities are : {trip?.activities.map((activity) => activity)}{' '}
            </li>
            <li>{console.log(columns)}</li>
          </ul>
        </div>
      </div>
    </DndContext>
  );

  //   ------ DRAG AND DROP FUNCTIONS --------------------------000000
  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
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
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
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

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

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
  }
}

export default TripDetails;
