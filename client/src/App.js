import { Switch, Route, BrowserRouter } from "react-router-dom";
import SessionWrapperHOC from "./SessionWrapper";
import { Component, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
///PAGES
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import Order from "./Pages/Order";
import Odeme from "./Pages/Odeme";
import Pages from "./Pages/Page";
import Ticket from "./Pages/Ticket";
import Soru from "./Pages/Soru";

const Root = ({ refetch, session }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home session={session} />} />
      <Route exact path="/Login" render={() => <Login />} />
      <Route exact path="/User" render={() => <User session={session} />} />
      <Route exact path="/Order" render={() => <Order session={session} />} />
      <Route exact path="/Odeme" render={() => <Odeme session={session} />} />
      <Route exact path="/Pages" render={() => <Pages session={session} />} />
      <Route exact path="/Ticket" render={() => <Ticket session={session} />} />
      <Route exact path="/Soru" render={() => <Soru session={session} />} />
      <Route
        exact
        path="/Product"
        render={() => <Product session={session} />}
      />
      <Route
        exact
        path="/Category"
        render={() => <Category session={session} />}
      />
      <Route
        exact
        path="/User/Logout"
        render={() => {
          localStorage.removeItem("inToken");
          window.location.href = "/Login";
        }}
      />
    </Switch>
  </BrowserRouter>
);

const RootWithSessionWrapper = SessionWrapperHOC(Root);
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer />
        <RootWithSessionWrapper />
      </Fragment>
    );
  }
}
