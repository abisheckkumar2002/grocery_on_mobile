import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './forget.css'

import { useNavigate, useParams } from "react-router-dom";
import  Header  from '../../layouts/Header/header';

import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import { forgetdatas } from '../../Api/forget';


export default function Forget() { 

    useEffect(() => {        
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const history = useNavigate();

    const [email, setemail] = useState("")
    const [validateError, setValidateError] = useState({});


    const getregisteremail = async () => {
        // alert("halamathi habiboo")
        var data = {   
          "email": email,
        }
        const register = await forgetdatas(data)
    
        console.log(register.errors,"kkkkkkkkkkkkkk")
        if (register.errors) {
          setValidateError(register.errors);
        }    
        else {
          console.log("loginlogin", register)
        //   history("/reset");
          // window.location="/login"
        //   swal({
        //     title: "Check Your Email",
        //     icon: "success",
        //     timer: 2000
        //   })
        history("/");
        swal("Password reset link has been sent to your mail");
      
        }    
      }


    const onChange = (e) => {
     e.preventDefault();
     console.log(e.target, "hhhhhh");
     const { id, value } = e.target;
     console.log(value, "hhhhhh");
     setemail(value)
     };


    return (
        <>
        <Header/>
        

        <div className='allbody'>       



<section class="loginpage">



    <div class="container">
    <Button onClick={() => history(-1)} variant="primary"><BsFillArrowLeftCircleFill style={{ fontSize: "18px", marginTop: "-3px" }} /> Back</Button>
       <div class="row">
        <div class="col-lg-2">
            </div>
            <div class="col-lg-10">
            <div class="card" style={{ marginTop:"20px" }}>
                <div class="title">
                    <h4>
                        Forgot Password
                    </h4>
                    {/* onChange={()=>registeremail()} */}
                 <form name="myForm"action="#" onsubmit="return check()" autocomplete="off">
                    <div class="textleft">
                        <label for="email">
                            Enter Your Registered Email<span class="spnred">*</span>
                        </label>
                        <input type="email" id="email" class="form-control" placeholder=" Email Address" 
                        aria-label="" aria-describedby="basic-addon1" value={email} onChange={onChange} required />
                         {validateError.email && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.email}
                                  </span>
                                )}
                    </div>

                    <div class="textleft">
                        <button type="button" onClick={() => getregisteremail()} style={{ marginTop:"2%" }} class="register-button">Submit</button>

                    </div>
                    
                </form>

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