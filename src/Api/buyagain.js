import { BUYAGAIN_URL } from '../Constant';
import axios from 'axios';

export const buyagaindatas = async (token) => {
    // console.log("wronggg", token)

    try {
        const buyagainpage = await axios({
            method: "get",
            url: `${BUYAGAIN_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
        })
 


        return buyagainpage.data;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}