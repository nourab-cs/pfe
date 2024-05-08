import { axiosClient } from "./axiosClient";




export  async function  createquiz(quiz) {
    try {
        return await axiosClient.post("/quiz/create",quiz,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}



export  async function  getAll(offre) {
    try {
        return await axiosClient.get("/quiz/all" ,{
            withCredentials:true
        })
        
    } catch (error) {
        console.log(error);
        
    }

}