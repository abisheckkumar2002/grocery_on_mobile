import { Login_URL } from '../Constant'
import axios from 'axios';

export const logindatas = async (data) => {
   

    try {
        const loginpage = await axios({
            method: "post",
            url: `${Login_URL}`,
           data:data
        })
 


        return loginpage.data
        
        
        
        

    }
    catch (error) {

        return error.response.data

    }
}
