import React, { useContext, useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import tripsService from "../services/trip.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function TripForm() {
  const [destinations, setDestinations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");

  const { isLoggedIn, user } = useContext(AuthContext);
  // const userId = user._id;

  const navigate = useNavigate();

  const handleDestinations = (e) => setDestinations(e.target.value);

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      const userId = user._id;
      const requestBody = { destinations, startDate, endDate, userId };

      tripsService
        .createTrip(requestBody)
        .then((response) => {
          console.log(response);
          navigate(`/trips/${response.data._id}`);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-1 flex justify-center w-11/12  rounded-lg lg:rounded-full bg-white shadow-lg">
      <form
        onSubmit={handleCreateTrip}
        className="flex justify-evenly items-center p-2 flex flex-col lg:flex-row"
      >
        <div className="flex flex-col items-center md:flex-row  justify-between lg:justify-evenly lg:w-profile">
          <input
            type="text"
            name="destinations"
            value={destinations}
            placeholder="Where are you going?"
            onChange={handleDestinations}
            className="mr-3 mb-3 md:mb-0 lg:mr-0 input input-bordered w-64 max-w-xs text-lg"
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
        </div>

        <button className="m-4 lg:m-0 btn btn-outline" type="submit">
          Plan Trip
        </button>
      </form>
    </div>
  );
}

export default TripForm;
