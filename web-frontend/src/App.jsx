import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFingerprint } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <div className="row">
      <div
        className="container-lg d-flex flex-fill border border-dark"
        id="containerBox"
      >
        <div className="d-none d-xl-block align-middle" id="innerContainerLogo">
          <div className="d-flex align-middle h-100">
            <img
              src="https://cdn.discordapp.com/attachments/930587252336263168/954995185140498462/IMG_7925.png"
              alt="logo"
              className="round align-middle"
            />
          </div>
        </div>
        <div
          style={{ background: "white" }}
          id="innerContainerLogin"
          className="flex-fill col"
        >
          <h1 className="text-center text-dark flex-fill mt-sm-5 ">
            {" "}
            Sign In{" "}
          </h1>
          <form className="mx-md-5">
            <span id="loginResult"></span>

            <div className="input-group flex-fill mt-md-5">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  {" "}
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>

            <div className="input-group flex-fill my-md-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faFingerprint} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-dark"
                htmlFor="flexCheckDefault"
              >
                Default checkbox
              </label>
            </div>
            <button
              type="submit"
              id="loginButton"
              className=" btn btn-primary  my-md-3"
            >
              {" "}
              Sign In
            </button>
            <p id="loginText" className="text-dark">
              <a href="google.com" className="text-dark">
                {" "}
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  return (
    <div
      className="container-lg d-flex flex-fill mx-md-5 border border-dark"
      id="containerBox"
    >
      <div className="d-none d-xl-block align-middle" id="innerContainerLogo">
        <div className="d-flex align-middle  h-100">
          <img
            src="https://cdn.discordapp.com/attachments/930587252336263168/954995185140498462/IMG_7925.png"
            alt="logo"
            className="round align-middle"
          />
        </div>
      </div>
      <div
        style={{ background: "white" }}
        id="innerContainerLogin"
        className="flex-fill col"
      >
        <h1 className="text-center text-dark flex-fill mt-sm-5 mb-md-5">
          {" "}
          Register{" "}
        </h1>
        <p className="text-danger flex-fill text-center" id="loginResult">
          {" "}
        </p>
        <form className="mx-md-5" id="registerForm">
          <div className="input-group flex-fill">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              id="userName"
            />
          </div>

          <div className="input-group flex-fill mt-md-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Email" />
          </div>

          <div className="input-group flex-fill my-md-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faFingerprint} />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="input-group flex-fill my-md-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faFingerprint} />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="button"
            id="loginButton"
            className=" btn btn-primary  my-md-3"
            onClick={registerUser}
          >
            {" "}
            Sign Up
          </button>
          <p id="loginText" className="text-dark">
            <a href="google.com" className="text-dark">
              {" "}
              Already have an account?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export function registerUser() {
  let formy = document.getElementById("registerForm");
  let arr = formy.querySelectorAll("input");

  // check if passwords match
  if (arr[2].value !== arr[3].value)
    document.getElementById("loginResult").innerHTML = "Passwords must match.";

  console.log(arr[0].value);
}
