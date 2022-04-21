
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import {  Form, Button, FormControl, Nav, Collapse } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import buildPath from '../../../../dependency';
import { Modal, Container, Row, Col} from "react-bootstrap";


const VerifyPopUp = ({title, active, email, setErrorMsg}) => {
    console.log(email)
    const [lgShow, setLgShow] = useState(false);
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const checkEmailInput = () => {
        if (email != "")
        {
            setLgShow(true);
            setErrorMsg('');
        }
        else
        {
            setErrorMsg('Please enter an email and get your code before continuing.');
        }
    }

    const resetPass = async () => {

        let payload = {
            email: email,
            givenCode: code,
            newPassword: password
        };

        console.log(payload);
        let response = await fetch(buildPath("api/resetPassword"), {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"}
        });

        let result = JSON.parse(await response.text());

        if (result.error == "") {
            setLgShow(false);
        }
    }

    return (
    <Button variant="primary" type="button" style = {{backgroundColor : "#c6faac", border : "none", color : "black", width: "100%"}}>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Enter Code</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>

                <Form.Group className="mb-3">
                    <Form.Label>Password Reset Code</Form.Label>
                    <Form.Control onInput={ (e) => {setCode(e.target.value)} } placeholder="e.g. 12345" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control onInput={ (e) => {setPassword(e.target.value)} } type="password" placeholder="Password" />
                </Form.Group>

                <Button onClick={resetPass}>
                    Reset Password
                </Button>
            </Form>
            </Modal.Body>

        </Modal>
        <div style={{backgroundColor : "#c6faac", border : "none", color : "black", width: "100%"}} disabled={false} onClick={checkEmailInput} active={active} >
          Enter Code
        </div>


    </Button>
    )
}


const ResetText = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    async function sendResetEmail(){
        console.log(email);
        let response = await fetch(buildPath("api/getResetCode"), {
            method: "POST",
            body: JSON.stringify( { email: email } ),
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" }
        });

        let res = JSON.parse(await response.text());
        console.log(res);
        if (res.error == "")
        {
            setErrorMsg('')
            setSuccessMsg('All good! Check your email and come back to enter your code here.')
        }


    }

  return (
    <Containers>
      <h1>What a mess. Don't worry, we'll clean it up. </h1>
      <br />
      <h4>What's your email? </h4>
    
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else. Except this entire class. 
          </Form.Text>
        </Form.Group>
        <Row>
            <Col>
                <Button onClick={sendResetEmail} variant="primary" style = {{backgroundColor : "#c6faac", border : "none", color : "black", width: "100%"}}>
                Submit Email
                </Button>
            </Col>
            <Col>
                <VerifyPopUp setErrorMsg={setErrorMsg} email={email} title="Something"/>
            </Col>
        </Row>
        <div style={{color:'red', fontSize:'14px', marginTop:'5px'}}>
           {errorMsg} 
        </div>
        <div style={{color: 'green', fontSize:'14px', marginTop:'5px'}}>
            {successMsg}
        </div>
      </Form>
      <br/>
    </Containers>
  );
};

const BtnContainer = styled.div`
  margin-top: 2rem;
  button {
    background: #2d3d8b;
    border: none;
    width: 50%;
    padding: 0.9rem 1.1rem;
    color: #fff;
    border-radius: .3rem;
    transition: all 0.3s ease-in-out;
    margin: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 17px 16px -11px ;
      transform: translateY(-5px);
    }
  }

  .readmore {
    color: red;
    background: black;
    border: 3px solid ;
    
    &:hover {
      box-shadow: 0px 17px 16px -11px;
      transform: translateY(-5px);
    }
  }
`;

const Containers = styled.div`
  padding: 1rem;
  h5 {
    color: #515151;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  h1 {
   font-size: 1.8rem;
    font-weight: 800;

    &:nth-of-type(1) {
      color: black;
    }
    &:nth-of-type(2) {
      color: black;
      font-weight: 700;
    }
    &:nth-of-type(3) {
      color: black;
      font-weight: 700;
    
    }
    &:nth-of-type(4) {
      color: black;
      font-weight: 700;
    }
  }

  h4 {
    font-size: 1.3rem;
     font-weight: 650;
 
     &:nth-of-type(1) {
       color: black;
     }
     &:nth-of-type(2) {
       color: black;
       font-weight: 700;
     }
     &:nth-of-type(3) {
       color: black;
       font-weight: 700;
     
     }
     &:nth-of-type(4) {
       color: black;
       font-weight: 700;
     }
   }
`;

export default ResetText;