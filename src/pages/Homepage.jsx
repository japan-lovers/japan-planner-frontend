import TripForm from "../components/TripForm";
import introImg from "../../public/japan.jpg";

function Homepage() {
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col items-center relative max-w-7xl">
        <div className="rounded-xl w-11/12 h-full py-48 flex-grow flex bg-home bg-center bg-no-repeat bg-cover bg-opacity-20 bg-neutral-50"></div>
        {/* <img
          src={introImg}
          className="mt-4 w-11/12 object-cover bg-gradient rounded-xl"
          alt="fuji-san in the fall"
        /> */}
        <h1 className="mx-20 text-center absolute font-semibold text-white text-3xl inset-y-32 sm:inset-y-40 md:text-4xl">
          Plan your next trip to Japan!
        </h1>
        <h2 className="mx-20 text-center absolute font-medium text-white text-md inset-y-56 sm:inset-y-52 md:text-lg">
          Discover the activities available all year round
        </h2>
        <div className="absolute w-11/12 flex justify-center bottom-minusminus md:bottom-minus lg:w-tripform lg:bottom-minus50 xl:bottom-minus40">
          <TripForm />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
