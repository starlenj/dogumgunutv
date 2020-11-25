import axios from "axios";

const SessionWrapper = (Component) => (props) => {
  var path = window.location.pathname.split("/");
  var session = [];
  //önce token varmı diye bak

  if (localStorage.getItem("dgToken") === null && path[1] !== "login") {
    window.location.href = "/login";
  } else {
    //token var valid et
    axios
      .post("http://localhost:3333/CheckToken", {
        token: localStorage.getItem("dgToken"),
      })
      .then((responseToken) => {
        if (responseToken.data.success === false && path[1] !== "login") {
          window.location.href = "/login";
        } else {
          session = responseToken.data.data;
        }
      });
  }
  return <Component session={session} {...props} />;
};

export default SessionWrapper;
