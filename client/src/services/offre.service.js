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

export  function  cacheOfffre(offre) {
    try {
        localStorage.setItem("cached-offre",JSON.stringify(offre))
        return JSON.parse(localStorage.getItem("cached-offre"))
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
export async function updateOffre(id, offre) {
    try {
        return await axiosClient.put(`/offre/update/${id}`, offre, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error);
    }
}