import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import DndDraggableCard from './DndDraggableCard';
import CardActivity from '../CardActivity';

function DndCardActivity({ name, data, id }) {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* {isHovered ? (
      <CardActivity name={name} id={name} /> */}
      {/* ) : ( */}
      <DndDraggableCard name={data?.name} id={id} />
      {/*)}
      <div
        className="absolute inset-0 z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div> */}
    </div>
  );
}

export default DndCardActivity;
