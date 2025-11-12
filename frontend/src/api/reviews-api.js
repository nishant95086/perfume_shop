import API from "./config";

export const getReviews = async (id) =>{
    try{
        const response = await API.get(`/reviews/${id}`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const addReview = async (id,data)=>{
    try{
        const response = await API.post(`/reviews/add/${id}`,data);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}