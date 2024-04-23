import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../services/axiosClient';
import { useLocation } from 'react-router-dom';

import { Link } from "react-router-dom"; // Import de Link depuis react-router-dom


const OffreDescription = () => {


    const location = useLocation();
    const id = location.pathname.split("/")[2];

    console.log(id);

    const [offer, setOffer] = useState({});
    

useEffect(()=>{
    axiosClient.get(`/offre/get-one?id=${id}`).then((res)=>{
        setOffer(res.data);
    }).catch(
     (error)=>{
        console.log(error);
     }   
    )
},[])




  return (
    <div className="offer-description p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sujet : </h2> {offer?.subject}
      <p className="mb-2">
        <strong>Lieu :</strong> 
      </p>
      <p className="mb-2">
        <strong>Durée de stage (en mois) :</strong> {offer?.duration}
      </p>
      <p className="mb-2">
        <strong>Nombre de stagiaires demandés :</strong> {offer?.places}
      </p>
      <p className="mb-4">
        <strong>Date limite de soumission de candidature :</strong> 
      </p>
      <h3 className="text-lg font-bold mb-2">Profil :</h3>
       <p></p>
      <h3 className="text-lg font-bold mb-2">Description :</h3>
      <ul className="list-disc ml-8 mb-4">
      {offer?.description}
        {/* {description.map((point, index) => (
          <li key={index}>{point}</li>
        ))} */}
      </ul>
     
      <h3 className="text-lg font-bold mb-2">Compétences requises :</h3>
      <ul className="list-disc ml-8">
        <li>{offer?.tech}</li>
      </ul>

      <Link to="/postuler" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                postuler
              </Link>
    </div>
  );
};

export default OffreDescription;
