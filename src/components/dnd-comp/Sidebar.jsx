import { Card, Typography } from '@material-tailwind/react';
import { useDroppable } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DndCardActivity from './DndCardActivity';

function Sidebar(props) {
  const { id, items, favs } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  // console.log(
  //   'FAVS IN SIDEBAR',
  //   items?.reduce((acc, element) => {
  //     if (favs?.includes(element._id)) {
  //       return [element, ...acc];
  //     }
  //     return [...acc, element];
  //   }, [])
  // );

  return (
    <Card className="h-[calc(100vh-5rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Select activities:
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
          {items
            ?.reduce((acc, element) => {
              if (favs?.includes(element._id)) {
                return [element, ...acc];
              }
              return [...acc, element];
            }, [])
            .map((activity) => {
              return (
                <DndCardActivity
                  data={activity}
                  key={activity._id}
                  id={activity._id}
                  isFavorite={favs?.includes(activity._id)}
                  width="w-full"
                />
              );
            })}
        </div>
      </SortableContext>
    </Card>
  );
}

export default Sidebar;
