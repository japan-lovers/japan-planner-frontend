import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import tripsService from "../services/trip.service";
import { useNavigate } from "react-router-dom";

function TripForm() {
  const [destinations, setDestinations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");

  const navigate = useNavigate();

  const handleDestinations = (e) => setDestinations(e.target.value);

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const requestBody = { destinations, startDate, endDate };

    tripsService
      .createTrip(requestBody)
      .then((response) => {
        navigate(`/trips/${response.data._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="rounded-full w-tripform bg-neutral-200">
      <form onSubmit={handleCreateTrip} className="flex justify-evenly p-2">
        <input
          type="text"
          name="destinations"
          value={destinations}
          placeholder="Where are you going?"
          onChange={handleDestinations}
          className="input w-64 max-w-xs"
        />

        <DateRangePicker
          endDate={endDate}
          endDateId="endDate"
          focusedInput={focusedInput.focusedInput}
          isOutsideRange={() => null}
          onDatesChange={onDatesChange}
          onFocusChange={(focusedInput) => setFocusedInput({ focusedInput })}
          startDate={startDate}
          startDateId="startDate"
        />
        <button className="btn btn-outline" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default TripForm;
