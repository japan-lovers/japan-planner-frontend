import { useEffect, useRef, useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import activitiesService from "../services/activities.service";
import "react-dates/initialize";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function CreateActivity({ isOpen, handleCloseModal, getAllActivities }) {
  if (!isOpen) return null;

  const [searchResult, setSearchResult] = useState("");
  const [enumCategories, setEnumCategories] = useState([]);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [focus, setFocus] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [openAllYear, setOpenAllYear] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState("");
  const [free, setFree] = useState(null);

  const [selectDates, setSelectDates] = useState(true);
  const [selectMultipleDates, setSelectMultipleDates] = useState(false);
  const [isRange, setIsRange] = useState(false);

  useEffect(() => {
    activitiesService
      .getCategories()
      .then((response) => setEnumCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setSelectDates(!selectDates);
  }, [openAllYear]);

  useEffect(() => {
    setSelectMultipleDates(!selectMultipleDates);
  }, [isRange]);

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

      setAddress(formattedAddress);
    } else {
      alert("Please enter text");
    }
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleOnDateChange = (date) => {
    setStartDate(date);
    setEndDate(date);
  };

  const handleCreateActivity = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      address,
      location,
      description,
      category,
      openAllYear,
      startDate,
      endDate,
      image,
      free,
    };

    console.log(requestBody);

    activitiesService
      .createActivity(requestBody)
      .then((response) => {
        getAllActivities();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center">
      {!isLoaded ? (
        <span className="loading loading-ring loading-lg mt-48 fixed bg-white"></span>
      ) : (
        <div className="flex justify-center">
          <div className="bg-modalbg fixed w-full h-full z-40 top-0"></div>
          <div className="fixed bg-white top-0 xl:top-10 2xl:top-20 z-50 p-14 rounded-xl shadow-md">
            <form onSubmit={handleCreateActivity} className="flex flex-col">
              <div className="flex justify-between items-baseline">
                <h1 className="font-bold text-2xl mb-4">
                  Create your own activity:
                </h1>
                <button
                  onClick={handleCloseModal}
                  className="btn btn-circle btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
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
                    defaultValue={category}
                    required
                    type="text"
                    placeholder="Category"
                    className="select select-sm select-bordered w-96 my-1"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="">Select category</option>
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

              <div className="flex flex-col items-center">
                {selectDates && (
                  <div className="flex flex-col w-96 my-1">
                    <div className="flex justify-between">
                      <label className="my-1">When is it?</label>

                      <div className="flex">
                        <label className="flex items-center mx-1">
                          <input
                            defaultChecked
                            type="radio"
                            value="false"
                            name="isRange"
                            className="radio radio-sm mx-1"
                            onChange={(e) => {
                              setIsRange(e.target.value);
                            }}
                          />
                          One date
                        </label>

                        <label className="flex items-center mx-1">
                          <input
                            type="radio"
                            value="true"
                            name="isRange"
                            className="radio radio-sm mx-1"
                            onChange={(e) => {
                              setIsRange(e.target.value);
                            }}
                          />
                          Multiple
                        </label>
                      </div>
                    </div>
                    {selectMultipleDates ? (
                      <SingleDatePicker
                        date={startDate}
                        onDateChange={handleOnDateChange}
                        focused={focus}
                        onFocusChange={({ focused }) => setFocus(focused)}
                        numberOfMonths={1}
                        showClearDate={true}
                        isOutsideRange={() => false}
                      />
                    ) : (
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
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-outline btn-sm w-24 m-6"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateActivity;
