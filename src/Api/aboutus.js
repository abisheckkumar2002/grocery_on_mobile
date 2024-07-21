import { ABOUT_URL } from '../Constant';
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

export const aboutdatas = async () => {
    //console.log('yes')
    try {
      let respData = await axios({
        method: "get",
        url: `${ABOUT_URL}`,
      });
      return {
        loading: false,
        aboutus: respData.data.about,
      };
    } catch (err) {
      return {
        loading: false,
        error: err.response.data.errors,
      };
    }
  };
