import { ORDERAGAIN_URL } from '../Constant';
import axios from 'axios';

export const orderagaindatas = async (token,id) => {
    // console.log("wronggg", token)

    try {
        const orderagainpage = await axios({
            method: "get",
            url: `${ORDERAGAIN_URL}` + id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
        })
 
        console.log(" orderagainpage.data====>",  orderagainpage.data)


        // return orderagainpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}