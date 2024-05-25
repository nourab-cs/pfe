import { PaperClipIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import { useLocation } from "react-router-dom";
import {useOffre} from "../stores/offreStore"

function ApplicantInformation() {
  const [candidate, setCandidates] = useState([]);
  const [Offre] = useOffre((state) => [state.Offre]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const OffreName = Offre.find((e)=>e._id == candidate.offre_id)

  useEffect(() => {
    axiosClient
      .get(`/postuler/get-one/${id}`, { withCredentials: true })
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" bg-white shadow-md rounded px-8 py-6 container mx-auto ">
        <div >
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Applicant Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nom Prénom
                </dt>

                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {candidate?.nom}  {candidate?.prénom}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {candidate?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Application for
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {OffreName?.titre}
                </dd>
              </div>
             

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Quiz Score
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {candidate?.quiz_score}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Attachments
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                          {candidate?.cv}
                          </span>
                          
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={candidate.cv}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                   
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      
    </div>
  );
}
export default ApplicantInformation;
