import { axiosClient } from "./axiosClient";




export  async function  createcandidature(candidature) {
    try {
        return await axiosClient.post("/postuler/create",candidature ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}



