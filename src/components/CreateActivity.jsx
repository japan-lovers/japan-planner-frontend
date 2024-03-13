import { useEffect, useRef, useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import activitiesService from "../services/activities.service";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function CreateActivity() {
  const [searchResult, setSearchResult] = useState("");
  const [enumCategories, setEnumCategories] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [openAllYear, setOpenAllYear] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [image, setImage] = useState("");
  const [free, setFree] = useState(null);

  useEffect(() => {
    activitiesService
      .getCategories()
      .then((response) => setEnumCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const formattedAddress = place.formatted_address;

      console.log(place.formatted_address);

      setAddress(formattedAddress);
    } else {
      alert("Please enter text");
    }
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCreateActivity = () => {};

  return (
    <div className="flex justify-center">
      {!isLoaded ? (
        <span className="loading loading-ring loading-lg mt-48"></span>
      ) : (
        <form onSubmit={handleCreateActivity} className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col mr-3">
              <label>Name:</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                className="input input-sm input-bordered w-96 my-1"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>Category:</label>
              <select
                required
                type="text"
                placeholder="Category"
                value={category}
                className="select select-sm select-bordered w-96 my-1"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {enumCategories.map((categ, index) => {
                  return (
                    <option key={index} value={categ}>
                      {categ}
                    </option>
                  );
                })}
              </select>
              <label>Address:</label>
              <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-sm input-bordered w-96 my-1"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Autocomplete>
              <label>Location:</label>
              <input
                required
                type="text"
                placeholder="Location"
                value={location}
                className="input input-sm input-bordered w-96 my-1"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />{" "}
              <div className="flex justify-between w-96 my-1">
                <legend>Is it open all year?</legend>
                <div className="flex">
                  <label className="flex items-center mx-1">
                    <input
                      defaultChecked
                      type="radio"
                      value="true"
                      name="openAllYear"
                      className="radio radio-sm mx-1"
                      onChange={(e) => {
                        setOpenAllYear(e.target.value);
                      }}
                    />
                    Yes
                  </label>

                  <label className="flex items-center mx-1">
                    <input
                      type="radio"
                      value="false"
                      name="openAllYear"
                      className="radio radio-sm mx-1"
                      onChange={(e) => {
                        setOpenAllYear(e.target.value);
                      }}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-3">
              <label>Image:</label>
              <input
                required
                type="text"
                placeholder="Add a url"
                value={image}
                className="input input-sm input-bordered w-96 my-1"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />

              <label>Description:</label>
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                className="textarea textarea-bordered w-96 h-40 my-1"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <div className="flex justify-between w-96 my-1">
                <legend>Is it free?</legend>
                <div className="flex">
                  <label className="flex items-center mx-1">
                    <input
                      type="radio"
                      value="true"
                      name="free"
                      className="radio radio-sm mx-1"
                      onChange={(e) => {
                        setFree(e.target.value);
                      }}
                    />
                    Yes
                  </label>

                  <label className="flex items-center mx-1">
                    <input
                      type="radio"
                      value="false"
                      name="free"
                      className="radio radio-sm mx-1"
                      onChange={(e) => {
                        setFree(e.target.value);
                      }}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {openAllYear && (
            <div className="flex flex-col my-1">
              <label>Select:</label>
              <DateRangePicker
                endDate={endDate}
                endDateId="endDate"
                focusedInput={focusedInput.focusedInput}
                isOutsideRange={() => null}
                onDatesChange={onDatesChange}
                onFocusChange={(focusedInput) =>
                  setFocusedInput({ focusedInput })
                }
                startDate={startDate}
                startDateId="startDate"
              />
            </div>
          )}

          <button type="submit" className="btn btn-outline btn-sm w-24 mt-2">
            Create
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateActivity;
