import { UPDATEADDRESS_URL } from '../Constant'
import axios from 'axios';

export const updateaddressdatas = async (id,reqData,token) => {

       console.log(id,reqData,token,"idreqDattokenidreqDatatoken")
    try {
        const updateaddresspage = await axios({
            method: "put",
            url: `${UPDATEADDRESS_URL}` + id,
            data:reqData,
             headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " +token
            },
            
        })

    //   console.log("cartpage.data",updateaddresspage.data)


        return updateaddresspage.data;


   

    }
    catch (error) {
        // console.log("errorrrrr====>", error)
        // console.log("400", error)

        return error.response.data

    }
}
