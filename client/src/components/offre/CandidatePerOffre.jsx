import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";

function CandidatePerOffre() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axiosClient
      .get(`/postuler/candidate-per-offre/${location.pathname.split("/")[3]}`)
      .then((res) => setData(res.data.map(candidate => ({ ...candidate, status: "Pending" }))))
      .catch((error) => console.error("Error fetching data:", error));
  }, [location.pathname]);

  const handleStatusChange = (index, newStatus) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].status = newStatus;
      return newData;
    });
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      {data.map((candidate, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold">{`${candidate.nom} ${candidate.prénom}`}</h2>
          <p className="text-gray-600">{candidate.qualite}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <span className="font-semibold">CIN:</span> {candidate.cin}
              </p>
              <p>
                <span className="font-semibold">Date of Birth:</span>{" "}
                {candidate.datedenaissance &&
                  new Date(candidate.datedenaissance).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Sexe:</span> {candidate.sexe}
              </p>
              <p>
                <span className="font-semibold">Telephone:</span> {candidate.telephone}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {candidate.email}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {candidate.region}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Diploma:</span> {candidate.diplome}
              </p>
              <p>
                <span className="font-semibold">University:</span>{" "}
                {candidate.universite}
              </p>
              <p>
                <span className="font-semibold">Domain:</span> {candidate.domaine}
              </p>
              <a href={candidate.cv} className="text-blue-500 hover:underline">
                View CV
              </a>
              <div>
                <button onClick={() => handleStatusChange(index, "Accepted")} className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2">
                  Accept
                </button>
                <button onClick={() => handleStatusChange(index, "Rejected")} className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2">
                  Reject
                </button>
                <button onClick={() => handleStatusChange(index, "Under Review")} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                  Under Review
                </button>
                <p>Status: {candidate.status}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidatePerOffre;
