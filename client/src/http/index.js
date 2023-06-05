import axios from "axios"


const api = async (endpoint, data,method, token)=>{
    const mainUrl = process.env.REACT_APP_BACKEND_URL;
        const instance = axios.create({
            baseURL: mainUrl,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'auth-token': token
            }
        })

        try{
            if(method === 'post') {
                const response = await instance.post(endpoint, data);
                return response
            }
            else if(method === 'get') {
                const response = await instance.get(endpoint);
                return response;
            }   
        }catch(err){
            console.log("error aaya h" + err);
            return err.response;
        }

}


      
    

export const postUserDetails = async (data)=> await api('/auth/createuser', data, 'post', '')
export const login = async (data)=> await api('/auth/login', data, 'post', '')
export const getUserData = async (token)=> await api('/auth/userdata', '', 'get', token);

export const addOrderToMongo = async (data, token)=> await api('/order/postOrder', data, 'post', token);
export const getOrderFromMongo = async (token)=> await api('/order/getOrder', '', 'get', token);
export const getOrderFromMongoForTransporters = async (token)=> await api('/order/getOrderForTransporter', '', 'get', token);


export const getMessages = async (to,token)=> await api('/message/get/'+to, '', 'get', token);
export const sendMessages = async (data, token)=> await api('/message/add', data, 'post', token);

export default api;


// module.exports = {getRoommateListRespone};