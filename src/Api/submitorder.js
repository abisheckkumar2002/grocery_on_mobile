import { GETDELIVERY, Home_URL, SUBMITORDER } from '../Constant'
import axios from 'axios';

export const submitorder = async (reqdata,token) => {
   console.log("paylaoddata",reqdata)
   try{
    const Response = await axios({
        url:`${SUBMITORDER}`,
        method:"post",
        data:reqdata,
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token

        } 
    })
    return Response.data
   }
   catch(err)
   {
    console.log("ERROR" ,err)
   }

}


export const deliverycharge = async (token) => {

    try{
        const Response = await axios({
            url:`${GETDELIVERY}`,
            method:"get",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            } 
        })
        return Response.data
       }
       catch(err)
       {
        console.log("ERROR" ,err)
       }

}