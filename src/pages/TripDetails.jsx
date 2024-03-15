import React from "react";
import { useParams } from "react-router-dom";
import AppDndTest from "../components/dnd-comp/AppDndTest";

function TripDetails() {
  const { id } = useParams();
  return (
    <div className="w-full">
      <AppDndTest id={id} />
    </div>
  );
}

export default TripDetails;
