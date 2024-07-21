import { ADD_TO_CART, REMOVE_CART } from '../Constant'

import axios from 'axios';




export const addtocart = async (payload) => {
try{
    console.log("productid",payload.productid)
    console.log("token",payload.token)
    const Response = await axios({
        method: "post",
        url: `${ADD_TO_CART}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + payload.token
        },
        data:{
            "product_id":payload.productid,
	        "quantity": 1,
            "product_variant_id":"",
            "type":payload.type
        }
    })
    console.log("Response",Response)
    console.log("Response_data",Response.data)
    return Response.data.message
}
catch(err)
{
    console.log("server error",err)
}
}

export const removecart = async (payload) => {

    try{
        console.log("cartid",payload.cartid)
        console.log("token",payload.token)
        var id = Number(payload.cartid)
        const Response = await axios({
            method: "delete",
            url: `${REMOVE_CART}`+id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + payload.token
            },
           
        })
        console.log("Response_data",Response.data)
        return Response.data.message
    }
    catch(err)
    {
        console.log("server error",err)
    }
}

