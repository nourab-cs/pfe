import { useEffect, useState } from "react"
import { getAll } from "../../services/offre.service"

function AllOffres() {
    const [offers, setOffers] = useState([])
    useEffect(() => {
        getAll().then(res => {
            console.log(res);
            setOffers(res.data)
        }).catch(err => console.log(err))
    }, [])
    return (
        <div>

            {
                offers.map((e,k)=>{
                 return    <div key={k}>

                           {e?.subject}


                    </div>
                })

            }
        </div>
    )
}

export default AllOffres