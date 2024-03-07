import TripForm from "../components/TripForm";
import introImg from "../public/japan.jpg";

function Homepage() {
  return (
    <div className="w-full flex flex-col items-center">
      <img src={introImg} className="w-11/12" alt="fuji-san in the fall" />
      <TripForm />
    </div>
  );
}

export default Homepage;
