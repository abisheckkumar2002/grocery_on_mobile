import { Home_URL } from '../Constant'
import axios from 'axios';




export const Csrf = async () => {
   

    try {

        // const getttt = await axios({
        //     method: "get",
        //     url: `http://192.168.1.5:8000/sanctum/csrf-cookie`,        
        // });

    const getttt =   axios.get('https://laravel.groceryonmobile.com/sanctum/csrf-cookie',{withCredentials: true});     
    // const getttt =   axios.get('https://laravel.groceryonmobile.com/sanctum/csrf-cookie',{withCredentials: true});    
       

        return getttt ;

    }
    catch (error) {
        console.log("error====>", error)
        console.log("400", error)


    }
}
