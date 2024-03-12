import React from 'react';
import { Link } from 'react-router-dom';

import { CheckIcon } from '@heroicons/react/20/solid';

const includedFeatures = [
  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
];

function CardTrips({ tripData }) {
  console.log(tripData.activities.map((el) => el.activity));
  return (
    <div>
      <Link to={`/trips/${tripData._id}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {tripData.destinations}
              </h3>

              <p className="mt-6 text-base leading-7 text-gray-600">
                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
                amet indis perferendis blanditiis repellendus etur quidem
                assumenda.
              </p>
            </div>
            <div className="flex mt-2 mb-2 mr-2 overflow-x-auto">
              {tripData.activities.map((el) => (
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink flex ">
                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-3xl font-bold tracking-tight text-gray-900">
                          {el.activity.name}
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                          {el.activity.location}
                        </span>
                      </p>

                      <p className="mt-6 text-xs leading-5 text-gray-600">
                        {el.activity.category}
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
