import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './registerpage.css'
import { useNavigate, useParams } from "react-router-dom";
import { registerdatas } from '../../Api/register';
import swal from "sweetalert";
import Form from 'react-bootstrap/Form'

import  Header  from '../../layouts/Header/header';




export default function Registerpage() {

  useEffect(() => {
    handleFormSubmit3();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const history = useNavigate();

  const [termscheck, settermscheck] = useState(0)

  const [fname, setfname] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState()
  const [type, settype] = useState(0)
  const [lname, setlname] = useState("")

  const [business_name, setbusinessname] = useState("")
  const [address_line_1, setaddressline1] = useState("")
  const [address_line_2, setaddressline2] = useState("")
  const [state, setstate1] = useState("")
  const [city, setcity] = useState("")
  const [zipcode, setzipcode] = useState("")


  const [validateError, setValidateError] = useState({});

  const handleFormSubmit3 = async () => {
   
   settype(1)
  };

  const handleFormSubmit4 = async () => {
     settype(0)
   };

   const termclick = async() => {

    settermscheck(1)
                             
   }


  const register = async () => {


    var data = {

      "email": email,
      "password": password,
      "fname": fname,
      "lname": lname,
      "mobile": mobile,


      "business_name": business_name,
      "address_line_1": address_line_1,
      "address_line_2": address_line_2,
      "state": state,
      "city": city,
      "zipcode": zipcode

    }
    if(type==1){
      data["user_type"] = "retail";
    }else{
      // alert("llll")
      data["user_type"] = "bulk";
    }

 
    const register = await registerdatas(data)

    console.log(register.errors,"kkkkkkkkkkkkkk")
    if (register.errors) {
      setValidateError(register.errors);

      //   history("/admin/bannerindex");
    }

    else {
      console.log("loginlogin", register)
      history("/login");
      // window.location="/login"
      swal({
        title: "Registered Successfully",
        icon: "success",
        timer: 2000
      })


    }

  }




  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setfname(value)
  };
  const onChange1 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setpassword(value)
  };
  const onChange2 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setemail(value)



  };

  const onChange3 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setmobile(value)



  };

  const onChange4 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setlname(value)



  };


  const onChange5 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setbusinessname(value)
  };
  const onChange6 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setaddressline1(value)
  };
  const onChange7 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setaddressline2(value)
  };
  const onChange8 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setstate1(value)
  };
  const onChange9 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setcity(value)
  };
  const onChange10 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setzipcode(value)
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
                    Create Your Account
                  </h4>
                  <form class="mt20">


                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <p class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={handleFormSubmit3}>Retail Customer</p>
                      </li>
                      {/* <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={handleFormSubmit4}>Business Customer</a>
                      </li> */}
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">



                        <div class="textleft mt20">
                          <label class="fontwght">
                            Register Here<span class="spnred">*</span>
                          </label>
                          <label className='labelpadding'>
                            If You Are Buying For Personal Uses
                          </label>
                        </div>
                        <form >
                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label>First Name<span class="spnred">*</span></label>
                                <input onChange={onChange} type="text" class="form-control" value={fname} required />
                                {validateError.fname && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.fname}
                                  </span>
                                )}
                              </div>
                              <div class="col">
                                <label>Last Name<span class="spnred">*</span></label>
                                <input type="text" class="form-control" id='lastname' value={lname} onChange={onChange4}  required />
                                {validateError.lname && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.lname}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="textleft">
                            <label>
                              Email Address<span class="spnred">*</span>
                            </label>
                            <input onChange={onChange2} type="email" class="form-control"  aria-label="" aria-describedby="basic-addon1" value={email} />
                            {validateError.email && (
                              <span style={{ color: "red", fontSize: "14px" }}>
                                {validateError.email}
                              </span>
                            )}
                          </div>


                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label  className='fontmobilecontact'>Contact Number<span class="spnred">*</span></label>
                                <input type="text" class="form-control" value={mobile} onChange={onChange3} placeholder="Contact Number"  />
                                {validateError.mobile && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.mobile}
                                  </span>
                                )}
                              </div>
                              <div class="col">
                                <label>Password<span class="spnred">*</span></label>
                                <input type="password" value={password} onChange={onChange1} class="form-control"   />
                                {validateError.password && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.password}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>


                          {/* <div class="textleft">
                            <ul>
                              <li>
                                <input type="checkbox" class="" placeholder=" " onClick={()=>termclick()} aria-label="" aria-describedby="basic-addon1" required />
                              </li>
                              <li>
                                <p className='ml20'>
                                  Accept The Term And Conditions <a href="/termsandconditions" style={{ color:"#0d6efd" }}>Click Here</a>
                                </p>
                                
                              </li>
                            </ul>
                          </div> */}

                          <div class="textleft ">
                          {/* <Form >
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                  <div className='displays'>
                                    <Form.Check onClick={()=>termclick()} className="checking" type="checkbox" label="Accept The Term And Conditions " />

                                    <a href="/termsandconditions" style={{ color:"#0d6efd", marginLeft:'3px' }}>  Click Here</a>
                                    </div>
                                    <span style={{ color: "red", fontSize: "15px" }}>dfdgfdgfdgfdgfd</span>
                                </Form.Group>

                            </Form> */}
                              <div class="mb-3 form-check">
    <input style={{ marginTop:"3px" }} type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Accept The Term And Conditions   <a href="/termsandconditions" style={{ color:"#0d6efd", marginLeft:'3px' }}>  Click Here</a></label>
                                                  {/* <br></br>  <span style={{ color: "red" }}>Please click a accept the terms and conditions</span> */}
  </div>
                            </div>


                          <div class="textleft">
                            <button type="button" style={{ marginTop:"2%" }} onClick={() => register()} class="register-button">Register</button>

                          </div>
                        </form>














                      </div>
                      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">



                        <div class="textleft mt20">
                          <label class="fontwght">
                            Register Here<span class="spnred">*</span>
                          </label>
                          <label>
                            If You Are A Business Customer   I.E. Grocery Store Or Restaurant
                          </label>
                        </div>
                        <form action="#">
                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label>First Name<span class="spnred">*</span></label>
                                {/* <input type="text" class="form-control" placeholder=" First Name" required /> */}
                                <input type="text" class="form-control" id='lastname' value={fname} onChange={onChange} placeholder="Last Name" />
                                {validateError.fname && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.fname}
                                  </span>
                                )}
                              </div>
                              <div class="col">
                                <label>Last Name<span class="spnred">*</span></label>
                                {/* <input type="text" class="form-control" placeholder="Last Name" required /> */}
                                <input type="text" class="form-control" id='lastname' value={lname} onChange={onChange4} placeholder="Last Name" />
                                {validateError.lname && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.lname}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label>Email Address<span class="spnred">*</span></label>
                                {/* <input type="email" class="form-control" placeholder=" Email Address" required /> */}
                                <input onChange={onChange2} type="email" class="form-control" placeholder=" Email Address" aria-label="" aria-describedby="basic-addon1" value={email} />
                                {validateError.email && (
                              <span style={{ color: "red", fontSize: "14px" }}>
                                {validateError.email}
                              </span>
                            )}
                              </div>
                              <div class="col">
                                <label>Contact Number<span class="spnred">*</span></label>
                                {/* <input type="number" class="form-control" placeholder=" " required /> */}
                                <input type="text" class="form-control" value={mobile} onChange={onChange3} placeholder=" Contact Number" />
                                {validateError.mobile && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.mobile}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div class="textleft">
                            <label>
                              Password<span class="spnred">*</span>
                            </label>
                            {/* <input type="password" class="form-control" placeholder=" Password" aria-label="" aria-describedby="basic-addon1" required /> */}
                            <input type="password" value={password} onChange={onChange1} class="form-control" placeholder="" />
                            {validateError.password && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.password}
                                  </span>
                                )}
                          </div>

                          <div class="textleft">
                            <label>
                              Business Name<span class="spnred">*</span>
                            </label>
                            
                            <input type="text" class="form-control" value={business_name} onChange={onChange5} placeholder=" Business Name" aria-label="" aria-describedby="basic-addon1" />
                            {validateError.business_name && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.business_name}
                                  </span>
                                )}
                          </div>

                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label>Address Line 1</label>
                               
                                <input type="text" class="form-control" value={address_line_1} onChange={onChange6} placeholder=" Business Name" aria-label="" aria-describedby="basic-addon1" />
                                {validateError.address_line_1 && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.address_line_1}
                                  </span>
                                )}
                              </div>
                              <div class="col">
                                <label>Address Line 2</label>
                               
                                <input type="text" class="form-control" value={address_line_2} onChange={onChange7} placeholder=" Business Name" aria-label="" aria-describedby="basic-addon1" />
                                {validateError.address_line_2 && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.address_line_2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label>State</label>
                             
                                <input type="text" class="form-control" value={state} onChange={onChange8} placeholder=" Business Name" aria-label="" aria-describedby="basic-addon1" />
                                {validateError.state && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.state}
                                  </span>
                                )}
                              </div>
                              <div class="col">
                                <label>City</label>
                                
                                <input type="text" class="form-control" value={city} onChange={onChange9} placeholder=" Business Name" aria-label="" aria-describedby="basic-addon1" />
                                {validateError.city && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.city}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="textleft">
                            <div class="row">
                              <div class="col">
                                <label>Zipcode</label>
                               
                                <input type="text" class="form-control" value={zipcode} onChange={onChange10} placeholder=" Business Name" aria-label="" aria-describedby="basic-addon1" />
                                {validateError.zipcode && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.zipcode}
                                  </span>
                                )}
                              </div>
                              <div class="col">
                                <div class="">
                                  <button type="button" onClick={() => register()} class="register-button">Register</button>

                                </div>

                              </div>
                            </div>
                          </div>

                          <div class="textleft">
                            <ul>
                              <li>
                                <input type="checkbox" class="" placeholder=" " aria-label="" aria-describedby="basic-addon1" required />
                              </li>
                              <li>
                                <p className='ml20'>
                                  Accept The Term And Conditions <a href="#">Click Here</a>
                                </p>
                              </li>
                            </ul>
                          </div>


                        </form>








                      </div>

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