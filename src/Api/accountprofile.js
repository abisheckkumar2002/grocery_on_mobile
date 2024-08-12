import { ACCOUNTPROFILE_URL } from '../Constant'
import axios from 'axios';




export const accountdetaildatas = async (reqData,token) => {
   

    try {
        const accountdetailpage =   await axios({
            method: "get",
            url: `${ACCOUNTPROFILE_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
            data:reqData
        })
 


        return accountdetailpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}

export const getaccountdetaildatas = async (token) => {
   

    try {
        const accountdetailpage = await axios({
            method: "get",
            url: `${ACCOUNTPROFILE_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
           
        })
 


        return accountdetailpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
