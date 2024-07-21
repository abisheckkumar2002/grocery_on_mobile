import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './contactus.css'



import  Header  from '../../layouts/Header/header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchhomeproducts, homeproductsSelector } from '../../Slices/homeproducts';






export default function Contactus() { 
    const dispatch = useDispatch()
    const { categories } = useSelector(homeproductsSelector)
    console.log("test",categories)

    useEffect(() => {
        var data = []
        dispatch(fetchhomeproducts(data))
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

   




    return (
        <>
        
        <Header/>

<div className='allbody'>

      {/* <!-- Contact Us --> */}
<section class="contactus">
    <div class="container">
        <div class="row">
            <div class="col-lg-3">
                <div class="card">
                <h1>
                   Store Information
                </h1>
                <div class="singlecontent">
                    <h4>
                        <img src={require('../../assets/contact-icon1.png')}   alt=" Address" />Address

                    </h4>
                    <address>
                        1327 Ashton Rd,<br></br>
                        Bay 3, Hanover,<br></br>
                        MD 21076
                    </address>

                </div>
                <div class="singlecontent">
                    <h4>
                        <img src={require('../../assets/contact-icon2.png')}  alt="Phone" />Phone

                    </h4>
                    <p>
                        866-868-8365
                    </p>

                </div>
                <div class="">
                    <h4>
                        <img src={require('../../assets/contact-icon3.png')}   alt="Email" />Email

                    </h4>
                    <p>
                        cs@groceryonmobile.com
                    </p>

                </div>
            </div>
            </div>
            <div class="col-lg-9">
                {/* <div class="card cardcontact">
                    <h1>
                        Contact Us
                    </h1>
                    
                        <form >
                            <div class="form-group">
                              <label for="fname"> Full Name<span class="spnred">*</span></label>
                              <input type="text" class="form-control" id="fname" aria-describedby="" placeholder="Full Name" required />
                              </div>
                              <div class="form-group">
                                <div class="row">
                                    <div class="col">
                                        <label for="phnum">Phone Number<span class="spnred">*</span></label>
                                      <input type="text" id="phnum" class="form-control" placeholder=" Phone Number" required />
                                    </div>
                                    <div class="col">
                                        <label for="email">Email Address<span class="spnred">*</span></label>
                                      <input type="email" id="email" class="form-control" placeholder="Email Address" required  />
                                    </div>
                                  </div>
                                </div>
                            <div class="form-group">
                              <label for="desp">Description</label>
                              <textarea type="description" class="form-control" id="desp" placeholder="Description"  >

                              </textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Submit</button>
                          </form>
                    
                </div> */}
                
                
                <div class="martop10">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3093.595379121299!2d-76.70761048485674!3d39.161183679530815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7e3b9503fffff%3A0xc86a9f60b76a2802!2s1327%20Ashton%20Rd%20Ste%203%2C%20Hanover%2C%20MD%2021076%2C%20USA!5e0!3m2!1sen!2sin!4v1670238251064!5m2!1sen!2sin" width="100%" height="400" style={{ border:0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />

        </div>
                
                
                

            </div>

        </div>
       

    </div>
</section>

</div>
{/* <!-- Contact Us ends --> */}
        
        
        
        </>

);
}