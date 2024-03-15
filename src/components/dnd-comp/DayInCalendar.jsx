import { Card, Typography } from '@material-tailwind/react';
import DndCardActivity from './DndCardActivity';
import { useDroppable } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function DayInCalendar(props) {
  const { id, items, favs, day } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  //   Function to format the date DD-MM-YYYY -------
  function formatDate(date) {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, '0'); // Add a 0 if necesarry to have DD
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month start at 0 so we add 1 and we adding a 0 if necessary to have MM
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="h-[calc(40vh-2rem)] w-full max-w-[15rem]    overflow-auto mt-4">
      <div className=" p-2 ">
        <Typography variant="h5" color="blue-gray">
          Day {day}
        </Typography>
      </div>
      <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
        <time datetime="2021-12-27">{formatDate(id).slice(0, 2)}</time>
      </div>
      {/* column activities Container  */}

      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-2 p-2 ">
          {items?.map((activity) => {
            return (
              <DndCardActivity
                name={activity.name}
                data={activity}
                key={activity._id}
                id={activity._id}
                isFavorite={favs?.includes(activity._id)}
              />
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
}

export default DayInCalendar;
