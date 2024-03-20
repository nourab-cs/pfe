import { axiosClient } from "./axiosClient";




export  async function  createOfffre(offre) {
    try {
        return await axiosClient.post("/offre/create",offre ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}



export  async function  getAll(offre) {
    try {
        return await axiosClient.get("/offre/all" ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}