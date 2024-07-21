import { UPDATEPROFILE_URL } from '../Constant'
import axios from 'axios';




export const updateprofiledatas = async (reqData,token) => {
   

    try {
        const updateprofilepage = await axios({
            method: "post",
            url: `${UPDATEPROFILE_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
            data:reqData
        })
 


        return updateprofilepage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)
      

            return error.response.data
    
        


    }
}
