import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './about.css'

import { aboutdatas } from '../../Api/aboutus';


import  Header  from '../../layouts/Header/header';



export default function Aboutus() { 
    
    const[aboutus,setaboutus] = useState("")
   
    const getaboutus = async () => {
   
        var about = await aboutdatas();
        console.log(about,"cccc")
        
        setaboutus(about.aboutus);
       
        
    }
    useEffect(() => {
        getaboutus()
    }, []);

   
   





    return (
        <>


<Header/>

<div className='allbody'>

<section class="aboutussection">
    <div class="container-fluid">
      <img src={require('../../assets/bannerabtus.png')}  alt="" />
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <img src={require('../../assets/aboutus.png')} alt="" />


            </div>
            <div class="col-lg-6">
                <div class=" ">
                    <h1>
                         
                     Welcome to <span class="grcolor">Grocery</span> <span class="redcolor">On Mobile</span> 
                    </h1>
                  
                    <p>{aboutus}</p>
                    <div>
                        <a href="/contactus"><button class="contactbtn">Contact us</button></a>
                    </div>

                </div>
            </div>

        </div>

    </div>

</section>

</div>

</>

);
}
