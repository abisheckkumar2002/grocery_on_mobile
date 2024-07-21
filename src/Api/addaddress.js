import { ACTIVE_ADDRESS, ADDADDRESS_URL, UPDATEADDRESS_URL } from '../Constant'
import axios from 'axios';




export const addaddressdatas = async (token,reqData) => {
   
  console.log("inside api call",reqData)
  console.log("token",token)
    try {
        const addaddresspage = await axios({
            method: "post",
            url: `${ADDADDRESS_URL}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
            data:reqData
        })
        return addaddresspage.data
    }
    catch (error) {
            return error.response.data
    }
}


export const updateadd = async (data) => {
   
 
      try {
          const addaddresspage = await axios({
              method: "post",
              url: `${ACTIVE_ADDRESS}`+data.id,
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: "Bearer " + data.token1
  
              },
          })
   
  
  
          return addaddresspage.data;
  
      }
      catch (error) {
          console.log("error====>", error)
          console.log("400", error)
        
  
              return error.response.data
      
          
  
  
      }
  }