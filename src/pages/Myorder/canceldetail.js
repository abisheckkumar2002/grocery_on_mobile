import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';

import Header from '../../layouts/Header/header';




export default function Vieworderdetail() { 

    useEffect(() => {
          // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);


return(

<>

<Header/>

<div className='allbody'></div>


<div className='myorder'>


<Container>

<Row>

<Col md={4}>

<Sidebars/>

</Col>

<Col md={8}>
             
            <div>
                <h2>
                    Order Details:-
                </h2>
            </div>
            <div>
                <table class="table table-bordered">
                    
                    <tbody>
                      <tr>
                        
                        <td colspan="2">Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total</td>
                        <td>Cancel the product</td>
                      </tr>
                      <tr>
                      
                        <td colspan="2">HARI DARSAN 12OZ</td>
                        <td>$.1.99</td>
                        <td>3</td>
                        <td class="text-right">$5.97</td>
                        <td class="text-right">Cancel this product</td>
                      </tr>
                      <tr>
                      
                        <td colspan="2">HARI DARSAN 12OZ</td>
                        <td>$.1.99</td>
                        <td>3</td>
                        <td class="text-right">$5.97</td>
                        <td class="text-right">Cancel this product</td>
                      </tr>
                      </tbody><tfoot class="text-right">
                        <tr>
                            <td colspan="5">Cancel Entire Order</td>
                            <td class="text-right">Cancel all products</td>
                            
                        </tr>
                                                                                                                                                                         
                           
                    </tfoot>
                     
                    
                  </table>
            </div>





</Col>

</Row>
</Container>







</div>







</>
);


}