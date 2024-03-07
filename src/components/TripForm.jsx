import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function TripForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div>
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
  );
}

export default TripForm;
