import { DELETEADDRESS_URL } from '../Constant'
import axios from 'axios';

export const deleteaddressdatas = async (id,token) => {

      console.log("idididid",id)
      console.log("token",token)


    try {
        const deleteaddresspage = await axios({
            method: "delete",
            url: `${DELETEADDRESS_URL}`+id ,
             headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            },
            
        })

      console.log("cartpage.data",deleteaddresspage.data)


        return deleteaddresspage.data;


   

    }
    catch (error) {
        console.log("errorrrrr====>", error)
        console.log("400", error)

        return error.response.data

    }
}
