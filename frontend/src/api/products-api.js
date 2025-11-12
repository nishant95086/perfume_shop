import API from './config'

export const allProduct = async () => {
    try{
        const response = await API.get('/products/');
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}
export const singleProduct = async (id) => {
    try{
        const response = await API.get(`/products/${id}`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}