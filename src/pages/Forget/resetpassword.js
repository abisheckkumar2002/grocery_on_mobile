import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './forget.css'

import { useNavigate, useParams } from "react-router-dom";
import  Header  from '../../layouts/Header/header';

import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import swal from "sweetalert";
import { newpassworddatas } from '../../Api/forget';

export default function Resetpassword() { 

    useEffect(() => {  
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    
    const history = useNavigate();
    const { token_id } = useParams();

    const initialFormValue = {
        newpassword: "",
        confirmpassword: ""
    };

    const [error1, seterror1] = useState(false)
    const [error2, seterror2] = useState(false)

    const [validateError, setValidateError] = useState({});

    const [formValue, setFormValue] = useState(initialFormValue);

    const onChange = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        let formData = { ...formValue, ...{ [id]: value } };
        setFormValue(formData);
        console.log(formValue);
    };

    const {
        newpassword,
        confirmpassword
    } = formValue;


    const handleFormSubmit = async () => {

        // if (currentpassword == "") {
        //     seterror1(true)

        // }
        if (newpassword == "") {
            seterror1(true)

        }
        else if (confirmpassword == "") {
            seterror2(true)

        }

        else if (!(newpassword === confirmpassword)) {

            seterror1(false)
            seterror2(false)
            // seterror3(false)
            swal({
                title: "New Password and Confirm Password Mismatch",
                icon: "warning",
                timer: 4000
            })
        }
        else {
            // console.log("saran");
            // const token = localStorage.getItem("user_token");
            e.preventDefault();
            console.log(formValue);

            let data = {
                newpassword: newpassword,
                confirmpassword,
                token_id
            };

            console.log(data, "sssoo")
            let { error } = await newpassworddatas(data);
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
                        Reset Password
                    </h4>
                 <form name="myForm"action="#" onsubmit="return check()" autocomplete="off">
                    <div class="textleft">
                        <label for="email">
                            New Password<span class="spnred">*</span>
                        </label>
                        <input type="password" id="newpassword" onChange={onChange} value={newpassword} class="form-control" placeholder="New password" aria-label="" aria-describedby="basic-addon1" required />
                        {error1 ?
                                                    <span style={{ color: "red" }}>Please Enter the New password</span> : null}
                    </div>

                    <div class="textleft">
                        <label for="email">
                            Confirm Password<span class="spnred">*</span>
                        </label>
                        <input type="password" id="confirmpassword" onChange={onChange} value={confirmpassword} class="form-control" placeholder="Confirm password" aria-label="" aria-describedby="basic-addon1" required />
                        {error2 ?
                                                    <span style={{ color: "red" }}>please enter the current Confirm password</span> : null}
                    </div>

                    <div class="textleft">
                        <button type="button" onClick={handleFormSubmit}  style={{ marginTop:"2%" }} class="register-button">Submit</button>

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