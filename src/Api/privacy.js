import { PRIVACY_URL } from '../Constant';
import axios from 'axios';




// export const aboutdatas = async () => {

//     try {
//         const aboutpage = await axios({
//             method: "get",
//             url: `${ABOUT_URL}`,
//             data:data
//         })
 


//         return aboutpage.data;

//     }
//     catch (error) {
//         console.log("error====>", error)
//         console.log("400", error)


//     }
// }

export const privacydatas = async () => {

    try {
      let respData = await axios({
        method: "get",
        url: `${PRIVACY_URL}`,
      });
      return {
        loading: false,
        privacyyy: respData.data.privacy_policy,
      };
    } catch (err) {
      return {
        loading: false,
        error: err.response.data.errors,
      };
    }
  };
