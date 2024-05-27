import React, { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../../stores/userStore";

const OffreDescription = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [offer, setOffer] = useState({});
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);

  useEffect(() => {
    axiosClient
      .get(`/offre/get-offre-quizzes?id=${id}`)
      .then((res) => {
        setOffer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sujet : {offer?.titre}</h2>
      <p className="mb-2">
        <strong>Lieu :</strong> {offer?.lieu}
      </p>
      <p className="mb-2">
        <strong>Durée de stage (en mois) :</strong> {offer?.dureeStage}
      </p>
      <p className="mb-2">
        <strong>Nombre de stagiaires demandés :</strong>{" "}
        {offer?.nombreStagiaires}
      </p>
      <p className="mb-4">
        <strong>Date limite de soumission de candidature :</strong>{" "}
        {new Date(offer?.dateLimite).toLocaleDateString()}
      </p>
      <h3 className="text-lg font-bold mb-2">Profil :</h3>
      <p className="mb-4">{offer?.profil}</p>
      <h3 className="text-lg font-bold mb-2">Description :</h3>
      <ul className="list-disc ml-8 mb-4">
        {offer?.mission &&
          offer?.mission.map((point, index) => <li key={index}>{point}</li>)}
      </ul>
      <h3 className="text-lg font-bold mb-2">Compétences requises :</h3>
      <ul className="list-disc ml-8 mb-4">
        {offer?.competences &&
          offer?.competences.map((competence, index) => (
            <li key={index}>{competence}</li>
          ))}
      </ul>
      {(user.role == "user" ) && (
      <Link
        to={`/postuler/${offer?.quiz_id}/${offer._id}`}
        className="inline-block px-4   py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
      >
        Postuler
     
      </Link>
      )} 
    </div>
  );
};

export default OffreDescription;
