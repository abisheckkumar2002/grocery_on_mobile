import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'
import swal from "sweetalert";
import Sidebars from './sidebar';

import { accountdetaildatas,getaccountdetaildatas } from '../../Api/accountprofile';
import { updateprofiledatas } from '../../Api/updateprofile';
import  Header  from '../../layouts/Header/header';
import { useDispatch } from 'react-redux';
import { fetchhomeproducts } from '../../Slices/homeproducts';
const initialFormValue = {   
    firstname: "",
    lastname:"", 
    email:"",
    mobile:""   
  };




export default function Accountdetails() { 

  const dispatch = useDispatch()   
  const [validateError, setValidateError] = useState({});
  console.log(validateError,"ffffff")

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


      const {
      
        firstname,
        lastname, 
        email,   
        mobile
      
        } = formValue;



        const getUserListdata = async () => {
          const token = localStorage.getItem("user_token");
          var test = await getaccountdetaildatas(token);
      console.log(test,"1234")
      let data = {};
   
      data["firstname"] = test.user_details.fname;
      data["lastname"] = test.user_details.lname;
      data["email"] = test.user_details.email;
      data["mobile"] = test.user_details.mobile;
      
  
  
      
    
      // formdata["Photofile"] = test.userValue.image;
      setFormValue(data);
  
      var data1 = []
      dispatch(fetchhomeproducts(data1))
     
          
      }


        const handleFormSubmit = async () => {
            console.log("saranzzzzz");
            const token = localStorage.getItem("user_token");
            
            console.log(formValue);
            let reqData = {
               
                fname:firstname,
                lname:lastname, 
                email:email,
                mobile:mobile 
               
            };
            console.log(reqData,"sss")
            // let result = await forgotPassword(reqData);
    
            // if (result) {
            //     history("/");
            //     swal("Password reset link has been sent to your mail");
            //   } else {
            //     swal("Please try again");
            //   }
            let  error  = await updateprofiledatas(reqData,token);
            console.log("error", error);
            if (!error.errors) {
                // window.location.reload()
                swal({
                    title: "Saved Successfully",
                    icon: "success",
                    timer: 4000
                  })
              // swal("Password reset link has been sent to your mail");
             
            } 
           else {
           
              setValidateError(error.errors);
            }
          
           
            
           
          };







          




    useEffect(() => {
          // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          getUserListdata()
      }, []);


return(

<>

<Header/>

<div className='allbody'>

<div>


<Container>

<Row>

<Col md={4}>

<Sidebars/>

</Col>

<Col md={8}>

<div className='myorder'>

<div class="backgrnd">
                    <h4>
                        Account Details
                    </h4>
          
                <form>
                <div class="row">
                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Firstname"  id="firstname" onChange={onChange} value={firstname} />
                    {validateError.fname && (
                                                          <span style={{color:"red",fontSize:"14px"}}>
                                                            {validateError.fname}
                                                          </span>
                                                        )}
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Lastname"  id="lastname" onChange={onChange} value={lastname} />
                  
                  </div>
                  <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Email" id="email" onChange={onChange} value={email} />
                    {validateError.email && (
                                                          <span style={{color:"red",fontSize:"14px"}}>
                                                            {validateError.email}
                                                          </span>
                                                        )}
                  </div>
                  <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Mobile" id="mobile" onChange={onChange} value={mobile} />
                    {validateError.mobile && (
                                                          <span style={{color:"red",fontSize:"14px"}}>
                                                            {validateError.mobile}
                                                          </span>
                                                        )}
                  </div>
                  <button class="savechanges"  onClick={handleFormSubmit} type="button">Save Changes</button>
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