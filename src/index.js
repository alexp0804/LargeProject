import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import MapPage from "./pages/MapPage"


const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register" >
          <Register />
        </Route>
        <Route path="/landing" >
          <Register />
        </Route>
        <Route path="/Map" >
          <MapPage />
        </Route>
      <Redirect to = "/" />
      </Switch>
    </Router>
  </StrictMode>,
  rootElement
);
