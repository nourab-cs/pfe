import { axiosClient } from "./axiosClient";


export  async function  getAll(stagiaire) {
    try {
        return await axiosClient.get("stagiaire/all" ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export  async function  ajouterStagiaire(stagiaire) {
    try {
        return await axiosClient.post("/stagiaire/create",stagiaire ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        

    }

}
export async function updateStagiaire(id, stagiaire) {
    try {
        return await axiosClient.put(`/stagiaire/update/${id}`, stagiaire, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error);
    }
}


