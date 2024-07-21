// import { ADDRESSLIST_URL } from '../Constant'
// import axios from 'axios';






// export const getaddressdatas = async (token) => {




//     try {
//         const addresspage = await axios({
//             method: "get",
//             url: `${ADDRESSLIST_URL}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: "Bearer " + token

//             },

//         })

//         // addresspage.data.address

//         return addresspage.data;

//     }
//     catch (error) {
//         console.log("error====>", error)
//         console.log("400", error)


//     }
// }






import { ADDRESSLIST_URL } from '../Constant'

import axios from 'axios';




export const getaddressdatas = async (token) => {
    console.log("mmmmm", token)

    try {
        
            const addresspage = await axios({
                method: "get",
                url: `${ADDRESSLIST_URL}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
    
                },
            })
     
    
    
            return addresspage.data;
        }
       

    // }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}





