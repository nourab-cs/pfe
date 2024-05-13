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
export  async function  getall(candidature) {
    try {
        return await axiosClient.get("/postuler/all" ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}


