
import { CANCELORDER_URL, CANCELORDERTRIGGER_URL } from '../Constant'
import axios from 'axios';

export const cancelorderdatas = async (token) => {
    console.log("wronggg", token)

    try {
        const cancelorderpage = await axios({
            method: "get",
            url: `${CANCELORDER_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
        })
 


        return cancelorderpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}





export const cancelordertriggerdatas = async (id,token) => {
    console.log("tyyty", token)

    try {
        const cancelordertriggerpage = await axios({
            method: "post",
            url: `${CANCELORDERTRIGGER_URL}` + id, 
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
        })
 


        return cancelordertriggerpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}

