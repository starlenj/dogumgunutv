import axios from "axios";

const SessionWrapper = (Component) => (props) => {
  /*Önce Token varmı bakılacak daha sonra token valid et ondan sonra duruma göre
  rediret et
    */
  var path = window.location.pathname.split("/");
  var Session;
  if (localStorage.getItem("dgToken") === null && path[1] !== "Login" && path[1] !== "Register" && path[1] !== "UserOnayla") {
    window.location.href = "/Login";
  } else {
    //TOKEN VALID
    let SessionResponse = axios.post(
      "http://localhost:4000/Api/V1/ValidToken",
      {
        token: localStorage.getItem("dgToken"),
      }
    );
    Session = SessionResponse;
  }
  return <Component {...props} session={Session} />;
};

export default SessionWrapper;
