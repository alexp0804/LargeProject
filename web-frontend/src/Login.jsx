import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function App() {
  // react hook (useState)
  // [variable that changes, function that changes it]
  const [message, setMessage] = useState("");
  let userName, password;

  const loginUser = async (event) => {
    // prevents the form from refreshing the page
    event.preventDefault();

    var obj = {username:userName.value, password:password.value}
    var js = JSON.stringify(obj)
    try
    {
        const response = await fetch('http://localhost:5000/api/login',{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text())
        if (res.verified === "no")
        {
            setMessage("Your email is not verified, please check your inbox")
        }
        else
        {
            window.location.href = "/register";
        }
    }
    catch (e)
    {
        console.log(e.toString())
    }
  };

  return (
    <div
      className="container-lg d-flex"
      id=""
      style={{
        background: "rgba(255,255,255, 0.6)",
        border: "1px solid rgba(0,0,0, 0.55)",
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
              borderRadius: "100%",
              border: "1px solid rgba(0,0,0, 0.55)"
            }}
          />
        </div>
      </div>
      <div id="" className="p-6">
        <h1 className="text-center text-dark flex-fill pt-5 "> Sign In </h1>
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
            <label
              className="form-check-label text-dark"
              htmlFor="flexCheckDefault"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            id="loginButton"
            className=" btn btn-primary my-3"
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