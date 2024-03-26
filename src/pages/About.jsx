import LaiaImg from "../../public/team-laia.jpg";
import ThomasImg from "../../public/team-thomas.jpeg";

function About() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-10/12 mx-6 mt-10 max-w-7xl">
        <div>
          <h1 className="font-bold text-2xl mb-4">About this project:</h1>
          <p className="my-2">
            Nippon Adventure, a React-powered web-app with the back end built in
            Express.js, is a trip planning tool designed by Japan enthusiasts to
            discovering the endless array of activities awaiting you in Japan.
            Our platform simplifies trip planning and unveils hidden gems,
            ensuring every day is filled with thrilling adventures tailored to
            your preferences. Discover how we're revolutionizing Japan travel
            for beginners to advanced Japan lovers.
          </p>
          <p className="my-2">
            Expore the{" "}
            <a
              href="https://github.com/japan-lovers/japan-planner-frontend"
              className=" italic hover:underline"
            >
              Front end
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/japan-lovers/japan-planner-backend"
              className=" italic hover:underline"
            >
              Back end
            </a>{" "}
            codebases of Nippon Adventure on{" "}
            <a
              href="https://github.com/japan-lovers"
              className=" italic hover:underline"
            >
              Github
            </a>
            .
          </p>
          <h1 className="font-bold text-2xl mt-10 ">The team:</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly">
          <div className="flex flex-col items-center my-4 md:my-0 md:w-5/12">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <img src={ThomasImg} />
              </div>
            </div>
            <h2 className="font-semibold text-1xl my-4">Thomas Deblay</h2>
            <p className="text-center">
              I love anime and Japanese food and I would love to visit Japan one
              day and use Nippon Adventure to plan my trip
            </p>
            <div className="my-4">
              <a href="https://github.com/Thomas-Deblay">
                <button className="btn btn-outline mx-1">Github</button>
              </a>
              <a href="https://www.linkedin.com/in/thomas-deblay/">
                <button className="btn btn-outline btn-info mx-1">
                  LinkedIn
                </button>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center my-10 md:my-0 md:w-5/12">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <img src={LaiaImg} />
              </div>
            </div>
            <h2 className="font-semibold text-1xl my-4">Laia Navalón Arxé</h2>
            <p className="text-center">
              My favourite things about Japan are the food, City Pop music and
              everything to do with fashion
            </p>
            <div className="my-4">
              <a href="https://github.com/feelikeadoll">
                <button className="btn btn-outline mx-1">Github</button>
              </a>
              <a href="https://www.linkedin.com/in/laianavalonarxe/">
                <button className="btn btn-outline btn-info mx-1">
                  LinkedIn
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
