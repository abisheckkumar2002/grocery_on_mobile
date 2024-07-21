import { DOWNLOAD_URL, ORDER_URL } from '../Constant'

import axios from 'axios';




export const orderdatas = async (token,key) => {
    console.log("pinkkk", token)

    try {
        
            const orderpage = await axios({
                method: "get",
                url: `${ORDER_URL}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
    
                },
            })
     
    
    
            return orderpage.data;
        }
       

    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}

export const downloadinvoice = async (token,id) => {
    console.log("pinkkk", token)

    try {
        
            const orderpage = await axios({
                method: "get",
                url: `${DOWNLOAD_URL}`+id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
    
                },
            })
     
    
    
            return orderpage.data;
        }
       

    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}





