import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';


import { useNavigate, useParams, Link } from "react-router-dom";

import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import { editaddressdatas } from '../../Api/editaddress';
import { updateaddressdatas } from '../../Api/updateaddress';

import  Header  from '../../layouts/Header/header';


export default function Editaddresslist() {



    useEffect(() => {
        getUserListdata()
    },[]);

    //   const getdata = async() => {
    //     const detail = await localStorage.getItem("edit_address")
    //     console.log("mmmm",detail)
    //   }
    const history = useNavigate();
const initialFormValue = {
    type:"",
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipcode: ""
};
    const { id } = useParams();

    // console.log("Test",id.id)

    const [formValue, setFormValue] = useState(initialFormValue);

    const [validateError, setValidateError] = useState({});
    console.log(validateError,"ffffff")
  

    const onChange = (e) => {
        e.preventDefault();
        // console.log(e.target);
        const { id, value } = e.target;
        let formData = { ...formValue, ...{ [id]: value } };
        setFormValue(formData);
        console.log(formValue);
        //setValidateError(formData)
    };


    const {
        type,
        address1,
        address2,
        state,
        city,
        zipcode
    } = formValue;



    const getUserListdata = async () => {

        const token = localStorage.getItem("user_token");
        const getedit = localStorage.getItem("edit_address");
        console.log(JSON.parse(getedit),"sandyyyyyyyyyyyyyyyyy")
        setFormValue(JSON.parse(getedit))
        // let data = {};
        // data["address1"] = test.address.address1;
        // data["address2"] = test.address.address2;
        // data["state"] = test.address.state;
        // data["city"] = test.address.city;
        // data["zipcode"] = test.address.zipcode;
        // let reqData = {
               
        //     address1:address1,
        //     address2:address2, 
        //     state:state,
        //     city:city, 
        //     zipcode:zipcode
        // };
        var test = await editaddressdatas(id,token);
        
     
        
    alert("hari")

        console.log(test, "Klrahul")
     

     setFormValue(data);

    }



    const handleFormSubmit = async () => {

        console.log("loveee");
        // const token = localStorage.getItem("user_token");

        console.log(formValue);
        let reqData = {
            type:type,
            address1: address1,
            address2: address2,
            state: state,
            city: city,
            zipcode: zipcode

        };
        console.log(reqData, "uuu")
        const getedit = localStorage.getItem("edit_address");
       var data = JSON.parse(getedit)
        // const getedit = localStorage.getItem("edit_address");
        const token = localStorage.getItem("user_token");
            let  error  = await updateaddressdatas(data.id,reqData,token);
            console.log("error", error);
            if (!error.errors) {
                // window.location.reload()
                swal({
                    title: "Updated Successfully",
                    icon: "success",
                    timer: 4000
                  }).then(function() {
                    window.location = "/addresslist";
                });
                //   window.location="/addresslist"
              // swal("Password reset link has been sent to your mail");

            } 
           else {

              setValidateError(error.errors);
            }




    };




    return (

        <>
<Header/>


<div className='allbody'>
            <div>


                <Container>

                    <Row>

                        <Col md={4}>

                            <Sidebars />

                        </Col>

                        <Col md={8}>

                            <div className='myorders'>

                                <Button onClick={() => history(-1)} variant="primary" style={{ marginBottom: "8px" }}><BsFillArrowLeftCircleFill style={{ fontSize: "18px", marginTop: "-3px" }} /> Back</Button>

                                <div class="card card2">


                                    <h4 id="modelTitle">Edit Address</h4>
                                    <input id="id" type="hidden" class="form-control" value="187" />
                                    <div className='row'>
                                    <div class="col-md-6">
                                            <label for="example-text-input" class="form-control-label">Type*</label>

                                            <input type="text" class="form-control" placeholder="addressLine1" id="address1" onChange={onChange} value={type} />
                                            {validateError.type && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.type}
                                  </span>
                                )}
                                        </div>
                                        <div class="col-md-6">
                                            <label for="example-text-input" class="form-control-label">Address Line 1*</label>

                                            <input type="text" class="form-control" placeholder="addressLine1" id="address1" onChange={onChange} value={address1} />
                                            {validateError.address1 && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.address1}
                                  </span>
                                )}
                                        </div>
                                        <div class="col-md-6">
                                            <label for="example-text-input" class="form-control-label l2">Address Line 2</label>
                                            <input type="text" class="form-control" placeholder="addressLine2" id="address2" onChange={onChange} value={address2} />
                                            {validateError.address2 && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.address2}
                                  </span>
                                )}
                                        </div>
                                        <div class="col-md-6">
                                            <label for="example-text-input" class="form-control-label">City*</label>

                                            <input type="text" class="form-control" placeholder="city" id="city" onChange={onChange} value={city} />
                                            {validateError.city && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.city}
                                  </span>
                                )}
                                        </div>
                                        <div class="col-md-6">
                                            <label for="example-text-input" class="form-control-label">State*</label>

                                            <input type="text" class="form-control" placeholder="state" id="state" onChange={onChange} value={state} />
                                            {validateError.state && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.state}
                                  </span>
                                )}
                                        </div>
                                        <div class="col-md-6">
                                            <label for="example-text-input" class="form-control-label">Zip Code*</label>
                                            <input type="text" class="form-control" placeholder="zipcode" id="zipcode" onChange={onChange} value={zipcode} />

                                            {validateError.zipcode && (
                                  <span style={{ color: "red", fontSize: "14px" }}>
                                    {validateError.zipcode}
                                  </span>
                                )}
                                        </div>
                                    </div>

                                    <div class="textleft">
                                        <button type="button" onClick={handleFormSubmit} class="btn register-button btn-primary">Update Address</button>

                                    </div>



                                </div>




                            </div>

                        </Col>

                    </Row>
                </Container>



            </div>


            </div>


        </>
    );

}