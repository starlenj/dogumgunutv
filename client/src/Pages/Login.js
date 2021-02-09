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
      localStorage.setItem("dgToken", Response.data);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };
  componentDidMount() {
    var path = window.location.pathname.split("/");
    if (localStorage.getItem("dgToken") !== null && path[1] === "Login") {
      window.location.href = "/";
    }
  }
  render() {
    return (
      <section class="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <div class="container p-0">
          <div class="row no-gutters">
            <div class="col-md-6 text-center pt-5">
              <div class="sign-in-detail text-white">

                <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                  <div class="item">
                    <img src="images/music.jpg" class="img-fluid mb-4" alt="logo" />
                    <h4 class="mb-1 text-white">Sana özel müziğin tadını çıkar</h4>
                    <p>
                      Merhaba; öncelikle tanıştığımıza memnun olduk.
                      Bizler Doğumgünü.Tv  ekibi olarak alanında
                      deneyim sahibi müzisyenleriz.
                      Şu an da sizlerle bizi buluşturmuş olan bu portalın oluşmasında fikir sahibi olmaktan
                      ve gelişiminde katkı sağlamaktan duyduğumuz mutluluğu umarız sizlere de aktarabiliriz. </p>
                  </div>
                  <div class="item">
                    <img src="images/concert.jpg" class="img-fluid mb-4" alt="logo" />
                    <h4 class="mb-1 text-white">Sen neredeysen  sana özel canlı performans orada.</h4>
                    <p>
                      Baştan ana fikri öğrenmeyi severiz  Dogumgunu.tv
                      sana özel bir müzik kanalı hemde öylesine özel
                      ki kendin ve sevdiklerinle sen ne istersen onu dinleyebileceğin bir uygulama…
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 bg-white pt-5">
              <div class="sign-in-from">
                <h1 class="mb-0">Giriş Yap</h1>
                <p>Lütfen E-Posta ve Şifrenizi Girin..</p>
                <form class="mt-4">
                  <div class="form-group">
                    <label for="exampleInputEmail1">E-Posta</label>
                    <input type="email" class="form-control mb-0" id="exampleInputEmail1" placeholder="E-Posta" name="Email" onChange={this.HandleInput} />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Şifre</label>
                    <a href="#" class="float-right">Şifremi Unuttum?</a>
                    <input type="password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Şifre" name="Password" onChange={this.HandleInput} />
                  </div>
                  <div class="d-inline-block w-100">
                    <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                      <input type="checkbox" class="custom-control-input" id="customCheck1" />
                      <label class="custom-control-label" for="customCheck1">Beni Hatırla</label>
                    </div>
                    <button type="button" class="btn btn-primary float-right" onClick={this.HandleLogin}>Giriş Yap</button>
                  </div>
                  <div class="sign-info">
                    <span class="dark-color d-inline-block line-height-2">Hesabın Yok mu? <a href="/Register">Kayıt Ol</a></span>
                    <ul class="iq-social-media">
                      <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
                      <li><a href="#"><i class="ri-twitter-line"></i></a></li>
                      <li><a href="#"><i class="ri-instagram-line"></i></a></li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>);
  }
}
