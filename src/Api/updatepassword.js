import { Updatepassword_URL } from '../Constant'
import axios from 'axios';




export const updatepassworddatas = async (reqData,token) => {
   

    try {
        const updatepasswordpage = await axios({
            method: "post",
            url: `${Updatepassword_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
            data:reqData
        })
 


        return updatepasswordpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
