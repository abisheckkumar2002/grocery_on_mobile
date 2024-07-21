import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';

import { buyagaindatas } from '../../Api/buyagain';

import  Header  from '../../layouts/Header/header';
import Viewproduct from '../Viewproduct/viewproduct';
import { fetchhomeproducts } from '../../Slices/homeproducts';
import { useDispatch } from 'react-redux';
import { Circles } from 'react-loader-spinner';

export default function Buyagain() { 
   const dispatch = useDispatch()
    useEffect(() => {
          // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          getbuyagain()
          setloading(true)
      }, []);

      const [loading, setloading] = useState(false)
      const [buyagains, setbuyagains] = useState([]);

      const getbuyagain = async () => {
        const token = localStorage.getItem("user_token");
        console.log("buysss", token)
            
        const buyagainlist = await buyagaindatas(token)
        setloading(false)
        console.log("buyagainlistbuyagainlist",buyagainlist.products.data)
        setbuyagains(buyagainlist.products.data)
         
        var data = []
        dispatch(fetchhomeproducts(data))
      }


      const viewproduct = (e) => {
        var data = JSON.stringify(e)
         localStorage.setItem("cart_product",data)
         window.location = "/viewproduct/" +e.id
    }


return(

<>

<Header/>

<div className='allbody'></div>
<div>


<Container>

<Row>

<Col md={4}>

<Sidebars/>

</Col>

<Col md={8}>

<div className='myorder'>

<div> 
                    <h4>
                        Previous Orders
                    </h4>
                </div>
                {loading ?
                                    <div className='loaderss'>
                                        <Circles style={{ justifyContent: "center" }} color="#0c3270" height={100} width={100} />
                                    </div> : 
                                    <div>
                {!buyagains.length ?
                                    <div className='firstsearch'>
                                        <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                                        {/* <h1>Searching...</h1> */}
                                    </div> :
                <table class="table table-bordered">
                <thead>
                  <tr>
                  
                    <th scope="col">Product Id</th>
                    <th scope="col">Product</th>
                    <th scope="col">Action</th>
                    <th scope="col">Price</th>
                    
                  </tr>
                  {buyagains.map((e, i) =>
                  <tr>
                    <td class="product-name">{e.id}</td>
                        <td class="product-name">{e.name}  </td>
                        <td>
                            {/* <a><button class="viewbtn">Buy Again</button></a>  */}
                            <a><button class="viewbtn margin20 matp" onClick={() => viewproduct(e)}>View Product</button></a>
                        </td>
                        {e.item_variant[0].offer_price ?
                       <td class="product-price"><span class="amount">$ {e.item_variant[0].offer_price}</span></td>:
                       <td class="product-price"><span class="amount">$ {e.item_variant[0].price}</span></td>
                      }
                    </tr>
                  )}
                    {/* <tr>
                        <td class="product-name">85</td>
                            <td class="product-name">Garlic 5 Sleeves  </td>
                            <td>
                                <a><button class="viewbtn">Buy Again</button></a> 
                                <a><button class="viewbtn margin20 matp">View Product</button></a>
                            </td>
                           <td class="product-price"><span class="amount">$2.99</span></td>
                           
                        </tr> */}
                </thead>
                <tbody>
                  <tr>
                    
                    
                  </tr>
                
   
                </tbody>
              </table>
}
</div>
}
              
           

</div>

</Col>

</Row>
</Container>



</div>





</>
);

}