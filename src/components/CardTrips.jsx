import React from 'react';
import { Link } from 'react-router-dom';

function CardTrips({ tripData }) {
  console.log(tripData);
  return (
    <div>
      <Link to={`/trips/${tripData._id}`}>{tripData.destinations}</Link>
    </div>
  );
}

export default CardTrips;
