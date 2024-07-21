import { SEARCH_URL } from '../Constant'
import axios from 'axios';




export const searchdatas = async (e) => {
   
    // console.log("ee", e)
    try {
        const searchpage = await axios({
            method: "get",
            url: `${SEARCH_URL}`+ e,
        //    data:data
        })
 

        // console.log("searchpage", searchpage.data)
        return searchpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
