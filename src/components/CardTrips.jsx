import React from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";

function CardTrips({ tripData }) {
  console.log(tripData);

  function datesDiff(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    const differenceInMillisecondes = Math.abs(date2 - date1);

    const differenceInDays = Math.ceil(
      differenceInMillisecondes / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  }

  return (
    <div className="w-full">
      <Link to={`/trips/${tripData._id}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="w-11/12 my-4 flex py-8 flex-col mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none ">
            <div className="flex justify-between px-8 sm:px-10 lg:flex-auto">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  {tripData.name}
                </h3>
                <p className="my-2 font-thin text-md">
                  {tripData.destinations}
                </p>
                {/* <p className="mt-6 text-base leading-7 text-gray-600">
                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
                amet indis perferendis blanditiis repellendus etur quidem
                assumenda.
              </p> */}
              </div>
              <div className="flex flex-col items-end">
                <Link to={`/user/${tripData.userId._id}`}>
                  <button className="btn btn-xs text-md">
                    {tripData.userId.username}
                  </button>
                </Link>
                <div className="my-2 font-thin text-md">
                  {datesDiff(tripData.startDate, tripData.endDate)} days
                </div>
              </div>
            </div>
            <div className="flex  overflow-x-auto ml-8 mr-8 ">
              {tripData.activities.map((el) => (
                <div key={el._id} className="flex flex-wrap">
                  <div
                    className="mx-2 h-48 w-40 bg-center bg-no-repeat bg-cover opacity-80 rounded-2xl  py-10 text-center ring-1 ring-inset bg-cover bg-center ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
                    style={{ backgroundImage: `url(${el.activity.image})` }}
                  >
                    <div className="z-10 mx-auto max-w-xs px-8 ">
                      <p className="mt-6 flex items-baseline justify-center gap-x-2 flex-col ">
                        <span className="text-md lg:text-xl font-bold tracking-tight text-white">
                          {el.activity.name}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardTrips;
