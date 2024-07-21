import { SEARCHING_URL } from '../Constant'
import axios from 'axios';




export const searchingdatas = async (e) => {
   
    // console.log("ee", e)
    try {
        const searchingpage = await axios({
            method: "get",
            url: `${SEARCHING_URL}`+ e,
        //    data:data
        })
 

        // console.log("searchpage", searchpage.data)
        return searchingpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
