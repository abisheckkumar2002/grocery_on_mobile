import { VIEWORDER_URL } from '../Constant'
import axios from 'axios';




export const vieworderhistory = async (id, token) => {

       
    try {
        const vieworderpage = await axios({
            method: "get",
            url: `${VIEWORDER_URL}` +  id ,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
        })

    //   console.log("cartpage.data",cartpage.data)


        return vieworderpage.data;


   

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
