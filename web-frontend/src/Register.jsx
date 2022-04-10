import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import buildPath from "./dependency";

export default function Register() {
  // react hook (useState)
  // [variable that changes, function that changes it]
  const [message, setMessage] = useState("");
  let userName, email, password, confirmPassword;

  const registerUser = async (event) => {
    // prevents the form from refreshing the page
    event.preventDefault();

    if (confirmPassword.value !== password.value) {
      setMessage("Passwords must match.");
      return;
    }

    let jsonPayLoad = JSON.stringify({
      username: userName.value,
      password: password.value,
      email: email.value
    });

    try 
    {
      // Do not await fetches anymore
      const response = await fetch(buildPath("api/register/web"), {
        method: "POST",
        body: jsonPayLoad,
        headers: { "Content-Type": "application/json" }
      });
      let res = JSON.parse(await response.text());

      // to do
      console.log(res);

      window.location.href = "/";
    } 
    catch (e) 
    {
      console.log("error")
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
      <div className="d-none d-xl-block col-md-6 my-auto">
        <div className="ml-5 ">
          <img
            src="https://cdn.dribbble.com/users/1044993/screenshots/14430492/media/778141084fd91f11c7949ac54de0b635.png"
            alt="logo"
            className="mx-auto"
            style={{
              height: "200px",
              width: "200px",
              objectFit: "cover",
              borderRadius: "100%",
              border: "none"
            }}
          />
        </div>
      </div>
      <div id="" className="p-6 col flex-fill">
        <h1 className="text-center text-dark flex-fill py-5 "> Register </h1>
        <p className="text-danger text-center">{message}</p>
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
          >
            {" "}
            Register
          </button>
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
