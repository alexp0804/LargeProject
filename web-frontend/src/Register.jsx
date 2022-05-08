import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import IceCream from "./assets/images/AddressPin.png"


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

export default function Register() {
  // react hook (useState)
  // [variable that changes, function that changes it]
  const [errorMessage, setBadMessage] = useState("");
  const [successMessage, setGoodMessage] = useState("");
  let userName, email, password, confirmPassword;

  const registerUser = async (event) => {
    // prevents the form from refreshing the page
    event.preventDefault();

    if (confirmPassword.value !== password.value) {
      setBadMessage("Passwords must match.");
      setGoodMessage("");
      return;
    }

    let jsonPayLoad = JSON.stringify({
      username: userName.value,
      password: password.value,
      email: email.value
    });

    try 
    {
      const response = await fetch(buildPath("api/register/web"), {
        method: "POST",
        body: jsonPayLoad,
        headers: { "Content-Type": "application/json" }
      });
      let res = JSON.parse(await response.text());

      // Registration success
      if (res.error === "")
      {
        setGoodMessage("All good! Check your email to verify your account.");
        setBadMessage("");
      }
    } 
    catch (e) 
    {
      console.log(e);
      return;
    }
  };

  return (
    <div
      className="container-lg d-flex"
      id=""
      style={{
        background: "rgba(255,255,255, 0.63)",
        border: "none",
        borderRadius: "7%"
      }}
    >
      <div className="d-none d-lg-block col-md-4 my-auto">
        <div>
        <img
            src={IceCream}
            alt="logo"
            className="mx-auto"
            style={{
              height: "70%",
              width: "280px",
              paddingRight: "2rem",
              border: "none"
            }}
          />
        </div>
      </div>
      <div id="" className="p-6 col flex-fill">
        <h1 className="text-center text-dark flex-fill py-5 "> Register </h1>
        <p className="text-danger text-center">{errorMessage}</p>
        <form className="px-5 flex-fill" onSubmit={registerUser}>
          <div className="input-group flex-fill pb-1">
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

          <div className="input-group flex-fill mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="email"
              className="form-control bg-transparent"
              placeholder="Email"
              ref={(input) => (email = input)}
              required
            />
          </div>

          <div className="input-group flex-fill mt-3">
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

          <div className="input-group flex-fill mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faFingerprint} />
              </span>
            </div>
            <input
              type="password"
              className="form-control bg-transparent"
              placeholder="Confirm Password"
              ref={(input) => (confirmPassword = input)}
              required
            />
          </div>

          <button
            type="submit"
            id="loginButton"
            className=" btn btn-primary mt-4"
            style={{background: "black", borderBlockColor: "black", border: "black"}}
          >
            {" "}
            Register
          </button>
          <p className="text-success text-center"
                style={{paddingTop: 10}}>{successMessage}</p>
          <p id="loginText" className="text-dark my-4">
            <a href="./" className="text-dark">
              <u> Already have an account?</u>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
