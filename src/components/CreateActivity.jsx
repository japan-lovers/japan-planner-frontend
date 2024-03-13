import { useEffect, useRef, useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import activitiesService from "../services/activities.service";

const placesLibrary = ["places"];

function CreateActivity() {
  const [searchResult, setSearchResult] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [openAllYear, setOpenAllYear] = useState(false);

  const autocompleteRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: placesLibrary,
  });

  const onLoad = () => {
    const autocomplete = autocompleteRef.current;
  };

  const onPlaceChanged = (place) => {
    setSearchResult(place);
    console.log(searchResult);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    activitiesService
      .getCategories()
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleCreateActivity = () => {};

  return (
    <div>
      <form onSubmit={handleCreateActivity} className="flex flex-col">
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

        <label>Address:</label>
        <Autocomplete
          onPlaceChanged={(place) => onPlaceChanged(place)}
          onLoad={onLoad}
        >
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
        />

        <label>Description:</label>
        <textarea
          type="text"
          placeholder="Location"
          value={description}
          className="textarea textarea-bordered w-96 my-1"
          onChange={(e) => {
            setDescription(e.target.value);
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
          <option value="">Category</option>
          <option value="">Category</option>
        </select>
        <button type="submit" className="btn btn-outline btn-sm w-24 mt-2">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateActivity;
