import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';

import { useNavigate, useParams, Link } from "react-router-dom";

import { getaddressdatas } from '../../Api/addresslist';
import { deleteaddressdatas } from '../../Api/deleteaddress';
import { updateadd } from '../../Api/addaddress';
import Header from '../../layouts/Header/header';
import { useDispatch } from 'react-redux';
import { fetchhomeproducts } from '../../Slices/homeproducts';
export default function Addresslist() {
  const dispatch = useDispatch()
  const [change1, setChange1] = useState(false)
  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getuseraddress()


  }, [change1]);


  const [deleteaddress, setdeleteaddress] = useState([])

  const history = useNavigate();

  const [useraddresslist, setuseraddresslist] = useState([])

  const getuseraddress = async () => {

    const token = localStorage.getItem("user_token");
    console.log("adddddddd", token)


    const hariaddress = await getaddressdatas(token)
    console.log("hariaddress11", hariaddress.address)
    setuseraddresslist(hariaddress.address)

    var data = []
    dispatch(fetchhomeproducts(data))
  }


  const editaddtessdetails = (list) => {
    //  console.log(id,"sssssssssssss")
    var data = JSON.stringify(list)
    localStorage.setItem("edit_address", data);
    window.location = "/editaddress"
    // history("/editaddress")

  }




  const deleteaddressdetails = async (id) => {

    const token = localStorage.getItem("user_token");
    console.log("hjhjhj", id)

    const deleteaddresss = await deleteaddressdatas(id, token)
    if (deleteaddresss.message == 'address deleted successfully') {
      if (change1) {
        setChange1(false)

      }
      else {
        setChange1(true)
      }
    }


  }
  const changaddress = (e) => {
    console.log(e.target.value, "harisex")
  }
  const [addressindex, setAddressindex] = useState(0)

  const updateaddress = async () => {

    const token = localStorage.getItem("user_token");
    var data = {
      id: useraddresslist[addressindex].id,
      token1: token
    }

    const result = await updateadd(data)
    if (result.message == "Active address set successfully") {
      window.location = "/cart"
    }
  }
  return (

    <>

      <Header />


      <div className='allbody'></div>

      <div>


        <Container>

          <Row>

            <Col md={4}>

              <Sidebars />

            </Col>

            <Col md={8}>

              <div className='myorders'>

                <div style={{ textAlign: "end", marginBottom: "10px" }}>
                  <button onClick={() => window.location = "/addaddress"} class='btn btn-primary' type='button'> Add Address</button>
                </div>



                <div className='row'>
                  <div class="col-md-12">

                    <div className='addy'>

                      {useraddresslist.map((e, i) =>

                        <div class="card">

                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={e.id} checked={addressindex == i} onChange={() => setAddressindex(i)} id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                              {/* <p style={{ marginBottom:"0px" }}>{e.type}, {e.address1} {e.address2} , {e.city}, {e.state}, {e.zipcode} </p> */}
                              <p style={{ marginBottom: "0px" }}>{e.type},</p>
                              <p style={{ marginBottom: "0px" }}>{e.address1}, {e.address2} , </p>
                              <p style={{ marginBottom: "0px" }}>{e.city} ,</p>
                              <p style={{ marginBottom: "0px" }}>{e.state} ,</p>
                              <p style={{ marginBottom: "0px" }}>{e.zipcode}</p>

                            </label>
                          </div>

                          <div>
                            <button class='btn btn-primary editz' type='button' onClick={() => editaddtessdetails(e)}><i class="fa fa-edit editAddress" title="Edit"></i> Edit</button>


                            {/* <button class='btn btn-danger deletez' onClick={()=>deleteaddressdetails(e.id)} type='button'><i class="fa fa-trash-o deleteAddress" title="Delete"></i> Delete</button> */}

                            <button class='btn btn-danger deletez' type='button' data-toggle="modal" data-target="#exampleModalCenter15"><i class="fa fa-trash-o deleteAddress" title="Delete"></i> Delete</button>
                            <div class="modal fade" id="exampleModalCenter15" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Confirm</h5>
                                    <button type="button" style={{ border: "1px", background: "white" }} class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" style={{ fontSize: "30px" }}>&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    Are you sure want to remove the address?
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn tabbtn yesbtn" onClick={() => deleteaddressdetails(e.id)} data-dismiss="modal">Yes</button>
                                    <button type="button" class="btn tabbtn yesbtn" data-dismiss="modal">No</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                           

                          </div>


                        </div>

                      )}
                    </div>


                    <div style={{ marginTop: "10px" }}>
                      <button class='btn btn-primary' onClick={() => updateaddress()} type='button'> Save Changes</button>
                    </div>


                  </div>
                </div>


              </div>


            </Col>

          </Row>
        </Container>



      </div>





    </>
  );

}