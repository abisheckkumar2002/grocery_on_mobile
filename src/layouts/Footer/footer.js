import React, { Component, useState, useEffect } from 'react';
import './footer.css'



export default function Footer() {


    return (
        <>





{/* <!-- Footer Section --> */}
<footer class="pt-35" >

    <div class="copyright-section  ">
        <div class="container">
        <div class="row  align-items-md-center align-items-sm-center">
                <div class="copy col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p class="copyright-text">© 2023 All Rights Reserved </p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-right ">
                     {/* <!--=======  copyright text	  =======--> */}

                     <div class="copyright-segment">
                        <p> <a href="/aboutus"  class="para"> About us</a>
                            <span class="separator"> | </span>
                            <a href="/privacypolicy" class="para"> Privacy Policy </a>
                            <span class="separator"> | </span>
                            <a href="/termsandconditions" class="para"> Terms and Conditions </a>
                            <span class="separator"> | </span>
                            <a href="https://www.facebook.com/" target="_blank" class="para"> <i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                            <span class="separator"> | </span>
                            <a href="https://www.instagram.com" target="_blank" class="para"> <i class="fa fa-instagram" aria-hidden="true"></i></a>
                        </p>
                    </div>
                       
                    

                    
                </div>
               
                {/* <!--=======  End of copyright text	  =======--> */}
            </div>
        </div>  
        
    </div>

    {/* <!--=======  End of copyright section  =======--> */}
</footer>







</>

);

}