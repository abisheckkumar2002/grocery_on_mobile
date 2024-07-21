import { REGISTER_URL } from '../Constant'
import axios from 'axios';




export const registerdatas = async (data1) => {
    console.log("datadata", data1)

    try {
        const registerpage = await axios({
            method: "post",
            url: `${REGISTER_URL}`,
           data:data1
        })
 


        return registerpage.data;

    }
    catch (error) {
        // console.log("error====>", error)
        // console.log("400", error)
         return error.response.data


    }
}

// export const registerdatas = async (data) => {
//     try {
//       let respData = await axios({
//         method: "post",
//         url: `${REGISTER_URL}`,
//         data: data,
//       });
//       return {
//         loading: false,
//       };
//     } catch (err) {
//       return {
//         loading: false,
       
//       };
//     }
//   };
