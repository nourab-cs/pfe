import { useState, useEffect } from "react";
import { axiosClient } from "../../services/axiosClient";

function AllCandidatures() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/postuler/all", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setCandidates(res?.data?.Candidatures);
      })
      .catch((err) => console.log(e));
  }, []);

  return <div>{
    candidates.map((e,i)=>{
        return <div key={i}>{e._id}</div>
    })
    }</div>;
}

export default AllCandidatures;
