import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';
import { useNavigate, useParams, Link } from "react-router-dom";

import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import { addaddressdatas } from '../../Api/addaddress';

import Header from '../../layouts/Header/header';



export default function Addaddresslist() {

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const history = useNavigate();

  const [validateError, setValidateError] = useState({});

  const [type, settype] = useState("")
  const [address1, setaddress1] = useState("")
  const [address2, setaddress2] = useState("")
  const [state, setstate] = useState("")
  const [city, setcity] = useState("")
  const [zipcode, setzipcode] = useState("")



  const addclickaddress = async () => {

    var data = {
       "type": type,   
      "address1": address1,
      "address2": address2,
      "state": state,
      "city": city,
      "zipcode": zipcode

    }
    console.log("ghjj", data)

    const token = localStorage.getItem("user_token");
    console.log("popuppp", token)
    const addregister = await addaddressdatas(token, data)

    console.log(addregister.data, "kkkkkkkkkkkkkk")
    if (addregister.errors) {
      setValidateError(addregister.errors);


    }

    else {
      console.log("lololo", addregister)
      // history("/addresslist");
      window.location='/addresslist'
      swal({
        title: "Add Address Successfully",
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
    setaddress1(value)
  };
  const onChange1 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setaddress2(value)
  };

  const onChange2 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setstate(value)
  };

  const onChange3 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setcity(value)
  };

  const onChange4 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    setzipcode(value)
  };

  const onChange5 = (e) => {
    e.preventDefault();
    console.log(e.target, "hhhhhh");
    const { id, value } = e.target;
    console.log(value, "hhhhhh");
    settype(value)
  };

  return (
    <>
      <Header />
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
                    <h4 id="modelTitle">Add Address</h4>
                    <input id="id" type="hidden" class="form-control" value="187" />
                    <div className='row'>
                    <div class="col-md-6">
                        <label for="example-text-input" class="form-control-label">Type</label>
                        <input onChange={onChange5} type="text" class="form-control" placeholder="Ex : Home / Office" id="type" value={type} />
                        {validateError.type && (
                          <span style={{ color: "red", fontSize: "14px" }}>
                            {validateError.type}
                          </span>
                        )}
                      </div>
                      <div class="col-md-6">
                        <label for="example-text-input" class="form-control-label">Address Line 1*</label>
                        <input onChange={onChange} type="text" class="form-control" placeholder="" value={address1} />
                        {validateError.address1 && (
                          <span style={{ color: "red", fontSize: "14px" }}>
                            {validateError.address1}
                          </span>
                        )}
                      </div>
                      <div class="col-md-6">
                        <label for="example-text-input" class="form-control-label l2">Address Line 2</label>
                        <input onChange={onChange1} type="text" class="form-control" placeholder="" value={address2} />
                        {validateError.address2 && (
                          <span style={{ color: "red", fontSize: "14px" }}>
                            {validateError.address2}
                          </span>
                        )}
                      </div>
                      <div class="col-md-6">
                        <label for="example-text-input" class="form-control-label">City*</label>
                        <input onChange={onChange3} type="text" class="form-control" placeholder="" value={city} />
                        {validateError.city && (
                          <span style={{ color: "red", fontSize: "14px" }}>
                            {validateError.city}
                          </span>
                        )}
                      </div>
                      <div class="col-md-6">
                        <label for="example-text-input" class="form-control-label">State*</label>
                        <input onChange={onChange2} type="text" class="form-control" placeholder="" value={state} />
                        {validateError.state && (
                          <span style={{ color: "red", fontSize: "14px" }}>
                            {validateError.state}
                          </span>
                        )}
                      </div>
                      <div class="col-md-6">
                        <label for="example-text-input" class="form-control-label">Zip Code*</label>
                        <input onChange={onChange4} type="text" class="form-control" placeholder="" value={zipcode} />
                        {validateError.zipcode && (
                          <span style={{ color: "red", fontSize: "14px" }}>
                            {validateError.zipcode}
                          </span>
                        )}
                      </div>
                    </div>
                    <div class="textleft">
                      <button type="button" onClick={() => addclickaddress()} class="btn register-button btn-primary">Update</button>
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