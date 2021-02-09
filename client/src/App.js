import { Switch, Route, BrowserRouter } from "react-router-dom";
import SessionWrapperHOC from "./SessionWrapper";
import { Component, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
///PAGES
import Login from "./Pages/Login";
import UserOnay from "./Pages/UserOnay";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import YayinTalebi from "./Pages/YayinTalebi/yayintalebi_page";

const Root = ({ refetch, session }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home session={session} />} />
      <Route exact path="/Login" render={() => <Login />} />
      <Route exact path="/Register" render={() => <Register />} />
      <Route exact path="/YayinTalebi" render={() => <YayinTalebi session={session} />} />
      <Route
        exact
        path="/User/Logout"
        render={() => {
          localStorage.removeItem("dgToken");
          window.location.href = "/Login";
        }}
      />
      <Route
        exact
        path="/UserOnayla/:token"
        render={() => <UserOnay />}
      />
    </Switch>
  </BrowserRouter>
);

const RootWithSessionWrapper = SessionWrapperHOC(Root);
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer position={"bottom-right"} />
        <RootWithSessionWrapper />
      </Fragment>
    );
  }
}
