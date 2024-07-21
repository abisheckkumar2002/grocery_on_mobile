import { EDITADDRESS_URL } from '../Constant'
import axios from 'axios';

export const editaddressdatas = async (id,  token) => {

       console.log(id,reqData,"idreqDattokenidreqDatatoken")
    try {
        const editaddresspage = await axios({
            method: "get",
            url: `${EDITADDRESS_URL}`+id ,
            data:reqData,
             headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " +token
            },
            
        })

      console.log("cartpage.data",editaddresspage.data)


        return editaddresspage.data;


   

    }
    catch (error) {
        console.log("errorrrrr====>", error)
        console.log("400", error)

        return error.response.data

    }
}
