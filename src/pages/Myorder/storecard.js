import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';


import  Header  from '../../layouts/Header/header';



export default function Storecard() { 

    useEffect(() => {
          // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);


return(

<>

<Header/>

<div className='allbody'>
<div>


<Container>

<Row>

<Col md={4}>

<Sidebars/>

</Col>

<Col md={8}>

<div className='myorder'>

<table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Added by</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Refund for order cancellation</td>
                        <td>admin</td> 
                        <td><b>$</b> 3.29                                                            </td><td>01-09-2023</td>
                        <td><b>$</b> 3.29                                                        </td></tr>
                        <tr>
                            <td>2</td>
                            <td>Refund for order cancellation</td>
                            <td>admin</td> 
                            <td><b>$</b> 3.29                                                            </td><td>01-09-2023</td>
                            <td><b>$</b> 6.58                                                        </td></tr>
                
                  
                </tbody>
              </table>

</div>

</Col>

</Row>
</Container>



</div>


</div>


</>
);

}