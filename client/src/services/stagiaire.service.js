import { axiosClient } from "./axiosClient";




export  async function  createOfffre(stagiaire) {
    try {
        return await axiosClient.post("/stagiaire/create",stagiaire ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}



export  async function  getAll(stagiaire) {
    try {
        return await axiosClient.get("/stagiaire/all" ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}