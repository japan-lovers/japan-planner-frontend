import { Card, Typography } from '@material-tailwind/react';
import DndCardActivity from './DndCardActivity';
import { useDroppable } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function DayInCalendar(props) {
  const { id, items } = props;

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
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  m-5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          {formatDate(id)}
        </Typography>
      </div>
      {/* column activities Container  */}

      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-2">
          {items?.map((activity) => {
            return (
              <DndCardActivity
                name={activity.name}
                data={activity}
                key={activity._id}
                id={activity._id}
              />
            );
          })}
        </div>
      </SortableContext>
    </Card>
  );
}

export default DayInCalendar;
