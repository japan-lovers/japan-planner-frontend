import TripForm from "../components/TripForm";
import introImg from "../../public/japan.jpg";

function Homepage() {
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col items-center relative max-w-7xl">
        <img
          src={introImg}
          className="mt-4 w-11/12 object-cover bg-gradient rounded-xl"
          alt="fuji-san in the fall"
        />
        <h1 className="absolute font-semibold text-white inset-y-16 sm:inset-y-28 text-2xl md:inset-y-32 md:text-3xl xl:inset-y-40 xl:text-4xl">
          Plan your next trip to Japan!
        </h1>
        <h2 className="hidden md:block absolute font-medium text-white inset-y-28 sm:inset-y-32 text-sm md:inset-y-44 md:text-md xl:inset-y-52 xl:text-lg">
          Discover the activities available all year round
        </h2>
        <div className="flex justify-center bottom-minusminus md:bottom-minus absolute w-11/12 lg:w-tripform lg:bottom-minus50 xl:bottom-minus40">
          <TripForm />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
