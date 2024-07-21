import { Home_URL } from '../Constant'
import axios from 'axios';




export const gettttt = async (id,value) => {


    try {
        const cartpage = await axios({
            method: "get",
            url: `${Home_URL}` + "?category=" + id+"&page="+value ,


        })

        // console.log("Hariiiiiii", cartpage.data)
        // var freefire = cartpage.data
        // var data123 = cartpage.data.products.data.map(e => ({
        //     id: e.id,
        //     productid: e.productid,
        //     name: e.name,
        //     category: e.category,
        //     offerprice: e.offerprice,
        //     price: e.price,
        //     quantity: e.quantity,
        //     image: e.image,
        //     qty: 0,
        //     check: false

        // }))
        // console.log("dggjhgjdg", { data123 })


        return cartpage.data;


   

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
