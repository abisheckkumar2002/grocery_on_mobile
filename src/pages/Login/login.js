import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './login.css'
import { useNavigate, useParams } from "react-router-dom";
import { logindatas } from '../../Api/login';
import swal from "sweetalert";
import isEmpty from "../../lib/isEmpty";


import  Header  from '../../layouts/Header/header';



export default function Login() {

    useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const [validateError, setValidateError] = useState({});
    console.log(validateError,"hhjgjh")

    const history = useNavigate();
    const [loginData, setloginData] = useState([])

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    
    const getlogin = async () => {


        var data = {

            "email": email,
            "password": password
        }

     

        const login = await logindatas(data)
      
      
       
              if (login.errors) {
                setValidateError(login.errors);
            
          //   history("/admin/bannerindex");
          } else {
            localStorage.setItem("user_token", login.token);
            
                console.log("fgfg",login)
                history("/");          
                window.location.reload()
                swal({
                    title: "Login Successfully",
                    icon: "success",
                    timer: 4000
                  })
                // swal("Login Successfully").then(function() {
                //     window.location = "/";
                // });
            
            
  
          }

        // console.log("loginlogin", login)
        // if (login) {
        //     localStorage.setItem("user_token", login.token);
        //     console.log("fgfg",login)
        //     history("/");          
        //     window.location.reload()
        //     swal({
        //         title: "Login Successfully",
        //         icon: "success",
        //         timer: 4000
        //       })
           
        // }
     
    }


    const onChange1 = (e) => {
        e.preventDefault();
        console.log(e.target, "hhhhhh");
        const { id, value } = e.target;
        console.log(value, "hhhhhh");
        setemail(value)



    };

    const onChange = (e) => {
        e.preventDefault();
        console.log(e.target, "hhhhhh");
        const { id, value } = e.target;
        console.log(value, "hhhhhh");
        setpassword(value)



    };

    return (
        <>

        <Header/>

<div className='allbody'>

            <section class="loginpage">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-10">
                            <div class="card">
                                <div class="title">
                                    <h4>
                                        Login
                                    </h4>
                                    <form action="home.html">
                                        <div class="textleft">
                                            <label>
                                                Email Address<span class="spnred">*</span>
                                            </label>
                                           <input onChange={onChange1} type="email" class="form-control" placeholder=" Email Address" aria-label="" value={email} aria-describedby="basic-addon1" required />
                                           {validateError.email && (
                                                          <span style={{color:"red",fontSize:"14px"}}>
                                                            {validateError.email}
                                                          </span>
                                                        )}
                                        </div>

                                        <div class="textleft">
                                            <label>
                                                Password<span class="spnred">*</span>
                                            </label>
                                            <input onChange={onChange} type="password" class="form-control" placeholder=" Password" aria-label="" value={password} aria-describedby="basic-addon1" required />
                                            {validateError.password && (
                                                          <span style={{color:"red",fontSize:"14px"}}>
                                                            {validateError.password}
                                                          </span>
                                                        )}
                                        </div>
                                        <div class="textleft">
                                            {/* <ul>
                                                <li>
                                                    <input type="checkbox" class="" placeholder=" " aria-label="" aria-describedby="basic-addon1" required />
                                                </li>
                                                <li>
                                                    <p className='ml20'>
                                                        Remember Me
                                                    </p>
                                                </li>
                                            </ul> */}
                                        </div>
                                        <div class="textleft">
                                            <ul>
                                                <li>
                                                    <a class="gray" href="/forget">
                                                        Forgot Password ?
                                                    </a>
                                                </li>
                                                <li  className='signuppadding'>
                                                    <a class="blue" href="/registerpage">
                                                        <i class="fa fa-user-plus padd30" aria-hidden="true"></i> SignUp for Grocery On Mobile
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="textleft">
                                            <button type="button" onClick={() => getlogin()} class="register-button" style={{ marginTop:"3%" }}>Login</button>

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