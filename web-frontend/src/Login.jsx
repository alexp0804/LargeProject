import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import IceCream from "./assets/images/Doodles/Reading.png"
import Cat from "./assets/images/Doodles/plant.png"

// This function is necessary to deploy both on heroku and localhost.
// You must use this to get the buildPath of any endpoint you call
const app_name = 'reci-pin';
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
        return 'https://' + app_name + '.herokuapp.com/' + route;
    else
        return 'http://localhost:5000/' + route;
}

export default function App() {
  // react hook (useState)
  // [variable that changes, function that changes it]
  const [message, setMessage] = useState("");
  let userName, password;

  const loginUser = async (event) => {
    // prevents the form from refreshing the page
    event.preventDefault();

    let jsonPayLoad = JSON.stringify({
        username: userName.value,
        password: password.value,
      });


    try 
    {
      // Do not await fetches anymore
      const response = await fetch(buildPath("api/login"), {
        method: "POST",
        body: jsonPayLoad,
        headers: { "Content-Type": "application/json" }
        });
      let res = JSON.parse(await response.text());
      localStorage.setItem('userObject', JSON.stringify(res))
  
      if(res.hasOwnProperty('error'))
        setMessage(res['error']);
  
      else
        window.location.href = "/landing";
    }
    catch(e)
    {
        setMessage(e)
    }


    return;
  };

  return (
    <div
      className="container-lg d-flex"
      id=""
      style={{
        background: "rgba(255,255,255, 0.6)",
        border: "none",
        borderRadius: "7%"
      }}
    >
      <div className="d-none d-lg-block col-md-4 my-auto">
        <div >
          <img
            src={IceCream}
            alt="logo"
            className="mx-auto"
            style={{
              height: "70%",
              width: "280px",
              paddingRight: "4rem",
              border: "none"
            }}
          />
        </div>
      </div>
      <div id="" className="p-6 flex-fill">
        <h1 className="text-center text-dark flex-fill pt-5 "> Sign In  
        
        </h1>
        <form className="px-5" onSubmit={loginUser}>
          <p className="text-danger text-center pt-4">{message}</p>

          <div className="input-group flex-fill">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="text"
              className="form-control bg-transparent"
              placeholder="Username"
              ref={(input) => (userName = input)}
              required
            />
          </div>

          <div className="input-group flex-fill py-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faFingerprint} />
              </span>
            </div>
            <input
              type="password"
              className="form-control bg-transparent"
              placeholder="Password"
              ref={(input) => (password = input)}
              required
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <div className = "d-flex justify-content-between">
                <label
                className="form-check-label text-dark"
                htmlFor="flexCheckDefault"
                >
                    Remember me     
                </label> 
                
                <a href="./register" className="text-dark">
                    <u>    Forgot password?</u>
                </a>
                
            </div>

          </div>
          <button
            type="submit"
            id="loginButton"
            className=" btn btn-primary my-3"
            style={{background: "black", borderBlockColor: "black", border: "black"}}
          >
            {" "}
            Sign In
          </button>
          <p id="loginText" className="text-dark">
            <a href="./register" className="text-dark">
              <u> Create an account</u>
            </a>
          </p>
          
        </form>
      </div>
    </div>
  );
}
