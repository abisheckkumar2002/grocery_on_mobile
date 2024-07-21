import { FORGET_URL } from '../Constant';
import axios from 'axios';
import { RESET_URL } from '../Constant';

export const forgetdatas = async (data) => {
   
    try {
        const forgetpage = await axios({
            method: "get",
            url: `${FORGET_URL}`+ data.email,
        //    data:data
        })

        return forgetpage.data   

    }
    catch (error) {

        return error.response.data

    }
}


export const newpassworddatas = async (data) => {
   
    try {
        const newpasswordpage = await axios({
            method: "post",
            url: `${RESET_URL}`,
           data:data
        })

        return newpasswordpage.data   

    }
    catch (error) {

        return error.response.data

    }
}
