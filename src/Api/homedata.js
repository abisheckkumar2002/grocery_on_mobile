import { FETCH_CART, Home_URL, URL_ADD_TO_WISHLIST } from '../Constant'
import axios from 'axios';




export const homedatas = async (id) => {

    var data = {
        category: id,

    }
    try {
        const cartpage = await axios({
            method: "get",
            url: `${Home_URL}`,
            data: data

        })
        console.log("getttcateeeee", cartpage.data)
        var freefire = cartpage.data
        var data123 = cartpage.data.products.data.map(e => ({
            id: e.id,
            productid: e.productid,
            name: e.name,
            category: e.category,
            offerprice: e.offerprice,
            price: e.price,
            quantity: e.quantity,
            image: e.image,
            qty: 0,
            check: false

        }))
        console.log("dggjhgjdg", { data123 })


        return { freefire, data123 };

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}

export const wishlist = async (payload) => {
    console.log("inside",payload)
    try {
        const response =  await axios({
          method:"post",
          url:`${URL_ADD_TO_WISHLIST}`+payload.id,
          headers:{
            Authorization:"Bearer " + payload.token
          }
         })
        return response.data
        }
        catch(err)
        {
            console.log("ERROR =====>",err)
        }

}


export const getwishlist = async (payload) => {
    try {
        const response =  await axios({
          method:"get",
          url:`${URL_ADD_TO_WISHLIST}`,
          headers:{
            Authorization:"Bearer " + payload
          }
         })
        return response.data
        }
        catch(err)
        {
            console.log("ERROR =====>",err)
        }
}


export const getcart = async (payload) => {
        try {
            const response =  await axios({
              method:"get",
              url:`${FETCH_CART}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + payload
            },
             })
            
        return response.data
        }
        catch(err)
        {
            console.log("ERROR =====>",err)
        }

}