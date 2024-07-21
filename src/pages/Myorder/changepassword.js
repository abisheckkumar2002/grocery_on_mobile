import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'
import swal from "sweetalert";
import Sidebars from './sidebar';

import { updatepassworddatas } from '../../Api/updatepassword';

import  Header  from '../../layouts/Header/header';
import { useDispatch } from 'react-redux';
import { fetchhomeproducts } from '../../Slices/homeproducts';

const initialFormValue = {
    currentpassword: "",
    newpassword: "",
    confirmpassword: ""
};



export default function Changepassword() {
   const dispatch = useDispatch()
    const [formValue, setFormValue] = useState(initialFormValue);

    const onChange = (e) => {
        e.preventDefault();
        // console.log(e.target);
        const { id, value } = e.target;
        let formData = { ...formValue, ...{ [id]: value } };
        setFormValue(formData);
        console.log(formValue);


        //setValidateError(formData)
    };

    const [error1, seterror1] = useState(false)
    const [error2, seterror2] = useState(false)
    const [error3, seterror3] = useState(false)

       const [validateError, setValidateError] = useState({});

    const {

        currentpassword,
        newpassword,
        confirmpassword


    } = formValue;


    const handleFormSubmit = async () => {




        if (currentpassword == "") {
            seterror1(true)

        }
        else if (newpassword == "") {
            seterror2(true)

        }
        else if (confirmpassword == "") {
            seterror3(true)

        }

        else if (!(newpassword === confirmpassword)) {



            seterror1(false)
            seterror2(false)
            seterror3(false)
            swal({
                title: "New Password and Confirm Password Mismatch",
                icon: "warning",
                timer: 4000
            })
        }
        else {
            console.log("saran");
            const token = localStorage.getItem("user_token");

            console.log(formValue);
            let reqData = {

                current_password: currentpassword,
                new_password: newpassword,
                confirmpassword

            };

            console.log(reqData, "sss")
            let { error } = await updatepassworddatas(reqData, token);
            console.log("error", error);
            if (!error) {
                swal({
                    title: "Saved Successfully",
                    icon: "success",
                    timer: 4000
                })

                // swal("Password reset link has been sent to your mail");

            }
            else {
                setValidateError(error);
            }

        }


    };

    useEffect(() => {
       var data = []
      dispatch(fetchhomeproducts(data))
        // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);








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

                            <div className='myorder'>

                                <div class="backgrnd">
                                    <h4>
                                        Change Password
                                    </h4>

                                    <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <input type="text" class="form-control" placeholder="Current Password" name="currentpassword" id="currentpassword" onChange={onChange} value={currentpassword} />
                                                {error1 ?
                                                    <span style={{ color: "red" }}>Please Enter the current password</span> : null}
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" placeholder="New Password" name="newpassword" id="newpassword" onChange={onChange} value={newpassword} />

                                                {error2 ?
                                                    <span style={{ color: "red" }}>Please Enter the New password</span> : null}
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" placeholder="Confirm Password" name="confirmpassword" id="confirmpassword" onChange={onChange} value={confirmpassword} />
                                                {error3 ?
                                                    <span style={{ color: "red" }}>please enter the current Confirm password</span> : null}
                                            </div>

                                            <button class="savechanges" onClick={handleFormSubmit} type="button">Save Changes</button>
                                        </div>
                                    </form>
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