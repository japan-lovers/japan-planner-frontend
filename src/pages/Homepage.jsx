import TripForm from "../components/TripForm";
import introImg from "../public/japan.jpg";

function Homepage() {
  return (
    <div className="w-full flex flex-col items-center relative">
      <img
        src={introImg}
        className="w-11/12 bg-gradient rounded-xl"
        alt="fuji-san in the fall"
      />
      <h1 className="absolute inset-y-40 font-semibold text-white text-4xl">
        Plan your next trip to Japan!
      </h1>
      <h2 className="absolute inset-y-52 font-medium text-white text-lg">
        Discover the activities available all year round
      </h2>
      <div className="absolute bottom-minus">
        <TripForm />
      </div>
    </div>
  );
}

export default Homepage;
