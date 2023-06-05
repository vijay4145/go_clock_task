import axios from "axios"


const api = async (endpoint, data,method, token)=>{
    // var idToken =  getAuth().currentUser;
    // if(idToken) idToken = await idToken.getIdToken();
    // if(!idToken) idToken = "bearer";
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
export default api;


// module.exports = {getRoommateListRespone};