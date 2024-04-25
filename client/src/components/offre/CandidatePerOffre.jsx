import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { axiosClient } from "../../services/axiosClient"
function CandidatePerOffre () {

    const location = useLocation()



    useEffect(()=>{
        axiosClient.get(`/postuler/candidate-per-offre/${location.pathname.split("/")[3]}`)
    },[])
 return <>test</>
}


export default CandidatePerOffre