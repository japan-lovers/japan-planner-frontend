import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import DndDraggableCard from "./DndDraggableCard";
import CardActivity from "../CardActivity";
import { useRef } from "react";

function DndCardActivity({ isFavorite, data, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleMouseEnter = () => {
    // Set a timeout to trigger the change after 2000 milliseconds (2 seconds)
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if the mouse leaves the card before the delay time has passed
    clearTimeout(timeoutRef.current);

    setTimeout(() => {
      setIsHovered(false);
    }, 1000);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <CardActivity activity={data} key={data._id} width="w-full" />
      ) : (
        <DndDraggableCard name={data?.name} id={id} isFav={isFavorite} />
      )}
    </div>
  );
}

export default DndCardActivity;
