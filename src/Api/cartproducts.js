import { ADD_TO_CART } from '../Constant'
import axios from 'axios';

export const getcartproducts = async (tokk) => {
    try {
        const getcart = await axios({
            method: "get",
            // url: `http://192.168.1.5:8000/api/cart`,
            url: `${ADD_TO_CART}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + tokk
            },
        })
        console.log("getcart", getcart.data)
        return getcart.data;
    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)
    }
}