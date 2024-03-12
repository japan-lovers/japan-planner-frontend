import { Card, Typography } from '@material-tailwind/react';
import { useDroppable } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DndCardActivity from './DndCardActivity';

function Sidebar(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Card className="h-[calc(100vh-5rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      {/* column activities Container  */}

      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
        Scrollable
      >
        <div ref={setNodeRef} className="flex flex-col gap-2 overflow-auto ">
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

export default Sidebar;
