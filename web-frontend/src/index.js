import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import WelcomePage from "./pages/WelcomePage";
import PasswordReset from './pages/PasswordReset';
import EmailVerification from './pages/EmailVerfied';
import './App.css';


const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<WelcomePage />}/>
        <Route path="/register" element = {<Register />}/>
        <Route path="/landing" element = {<Landing />}/>
        <Route path="/home" element = {<WelcomePage/>}/>
        <Route path="/email" element = {<EmailVerification/>}/>
        <Route path="/reset" element = {<PasswordReset/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
