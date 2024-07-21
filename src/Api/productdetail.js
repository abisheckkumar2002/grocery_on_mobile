import { PRODUCTDETAIL_URL } from '../Constant'
import axios from 'axios';




export const productdetail = async (id,token) => {


    try {
        const cartpage = await axios({
            method: "get",
            url: `${PRODUCTDETAIL_URL}` +  id ,
            headers:{
                Authorization:"Bearer " +token
              }
        })

    //   console.log("cartpage.data",cartpage.data)


        return cartpage.data;


   

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
