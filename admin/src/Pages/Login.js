import { Component } from "react";
import { Post } from "../Helper/Service";
import { connect } from "react-redux";
import { SetActiveUser } from "../Redux/Action/User";
export default class Login extends Component {
  state = { Email: "", Password: "" };
  constructor(props) {
    super(props);
    this.HandleInput = this.HandleInput.bind(this);
  }

  HandleInput = async (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  HandleLogin = async () => {
    const { Email, Password } = this.state;
    let Response = await Post("Login", { Email, Password });
    if (Response.success) {
      localStorage.setItem("inToken", Response.data);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };
  componentDidMount() {
    var path = window.location.pathname.split("/");
    if (localStorage.getItem("inToken") !== null && path[1] === "Login") {
      window.location.href = "/";
    }
  }
  render() {
    return (
      <div>
        <div class="page-content">
          <div class="content-wrapper">
            <div class="content d-flex justify-content-center align-items-center">
              <form class="login-form">
                <div class="card mb-0">
                  <div class="card-body">
                    <div class="text-center mb-3">
                      <h5 class="mb-0">Lütfen Giriş Yapınız</h5>
                      <span class="d-block text-muted">Hesap Bilgileriniz</span>
                    </div>

                    <div class="form-group form-group-feedback form-group-feedback-left">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="E-Posta"
                        name="Email"
                        onChange={this.HandleInput}
                      />
                      <div class="form-control-feedback">
                        <i class="icon-user text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group form-group-feedback form-group-feedback-left">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Şifre"
                        name="Password"
                        onChange={this.HandleInput}
                      />
                      <div class="form-control-feedback">
                        <i class="icon-lock2 text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group d-flex align-items-center"></div>

                    <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-primary btn-block"
                        onClick={this.HandleLogin}
                      >
                        Giriş Yap
                        <i class="icon-circle-right2 ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
