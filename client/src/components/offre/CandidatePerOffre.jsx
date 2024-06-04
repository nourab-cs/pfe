import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";
import { Button } from "@nextui-org/button";
import Modal from "../layouts/Modal-next";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { wrap } from "framer-motion";

function CandidatePerOffre() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [date, setDate] = useState(Date.now());
  const [refetch, re] = useState(true);
  const [openModal, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    axiosClient
      .get(`/postuler/candidate-per-offre/${location.pathname.split("/")[3]}`, {
        withCredentials: true,
      })
      .then((res) =>
        setData(
          res.data.map((candidate) => ({ ...candidate, status: "Pending" }))
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, [location.pathname]);

  const handleStatusChange = (index, newStatus) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].status = newStatus;
      return newData;
    });
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  const setCandidature = async (id, Status, date) => {
    try {
      const result = axiosClient.post(
        "/postuler/set-candidature",
        {
          id,
          Status,
          date,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-wrap justify-around	">
      {data.map((candidate, index) => (
        <div key={index} className="mb-4">
          <Card className="max-w-[550px]" style={{ flex: '0 0 auto', width: '550px' }}>
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{`${candidate.nom} ${candidate.prénom}`}</h2>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
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
                    <span className="font-semibold">Sexe:</span>{" "}
                    {candidate.sexe}
                  </p>
                  <p>
                    <span className="font-semibold">Telephone:</span>{" "}
                    {candidate.telephone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>:
                    {candidate.email}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Diploma:</span>{" "}
                    {candidate.diplome}
                  </p>
                  <p>
                    <span className="font-semibold">University:</span>{" "}
                    {candidate.universite}
                  </p>
                  <p>
                    <span className="font-semibold">Domain:</span>{" "}
                    {candidate.domaine}
                  </p>
                  <a
                    href={candidate.cv}
                    className="text-blue-500 hover:underline"
                  >
                    View CV
                  </a>
                  <div></div>
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {candidate.region}
              </p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CandidatePerOffre;
