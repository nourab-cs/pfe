import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"

import { axiosClient } from "../../services/axiosClient"
function CandidatePerOffre () {

    const [data,setData] = useState([])

    const location = useLocation()



    useEffect(()=>{
        axiosClient.get(`/postuler/candidate-per-offre/${location.pathname.split("/")[3]}`).then(res=>setData(res.data))
    },[])
 return <>test</>
}


export default CandidatePerOffre