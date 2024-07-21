import { TERMS_URL } from '../Constant';
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

export const termsdatas = async () => {
    //console.log('yes')
    try {
      let respData = await axios({
        method: "get",
        url: `${TERMS_URL}`,
      });
      return {
        loading: false,
        termss: respData.data.terms_and_conditions,
      };
    } catch (err) {
      return {
        loading: false,
        error: err.response.data.errors,
      };
    }
  };
