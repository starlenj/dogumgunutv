import { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SessionWrapper from "./SessionHoc";
import Home from "./Pages/Home";
const Root = ({ session }) => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path="/" exact render={() => <Home session={session} />} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);
const SessionWrapperWithRoute = SessionWrapper(Root);
export default class App extends Component {
  render() {
    return <SessionWrapperWithRoute />;
  }
}
