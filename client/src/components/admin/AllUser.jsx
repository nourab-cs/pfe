import { useEffect } from "react"
import { getAllUsers } from "../../services/admin.services"
function AllUser() {
    useEffect(()=>{

      getAllUsers().then(res=>{
        console.log(res);
      }).catch(err=>console.log(err))
    

    },[])
  return (
    <div>AllUser</div>
  )
}

export default AllUser