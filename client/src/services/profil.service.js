import { axiosClient } from "./axiosClient";




export  async function  createprofil(profil) {
    try {
        return await axiosClient.post("/profil",profil ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}