import React, { Component } from 'react'
import HeaderNav from '../components/Nav'
import { Post } from '../helper/Service';
export default class Login extends Component {
    state = { email: "", password: "" };
    constructor(props) {
        super(props);
        this.HandleInput = this.HandleInput.bind(this);
        this.HandleLogin = this.HandleLogin.bind(this);
    }
    HandleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        //isset session go to home page 
        if (localStorage.getItem("dgToken") !== null) {
            //token valid
            window.location.href = "/Home";
        }
    }
    async HandleLogin() {
        const { email, password } = this.state;
        let responseLogin = await Post('login', { email, password });
        if (responseLogin.data.success) {
            localStorage.setItem("dgToken", responseLogin.data.data);
            window.location.href = "/Home";
        } else {
            //toast message login başarısız

            alert(responseLogin.data.msg);
        }
    }
    render() {
        return (
            <div >
                <HeaderNav session={this.props.session} />
                <div class="container app mt-5">
                    <h4>Giriş</h4>

                    <hr class="my-4" />
                    <div class="row">
                        <form method="post" class="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                            <div class="form-group">
                                <label>E-postanız</label>
                                <input type="email" name="email" class="form-control" placeholder="E-postanız" required onChange={this.HandleInput} />
                            </div>
                            <div class="form-group">
                                <label>Şifreniz</label>
                                <input type="password" name="password" class="form-control" placeholder="Şifreniz" required onChange={this.HandleInput} />

                            </div>
                            <div class="form-group">
                                <div class="leader">
                                    Hasabınız yok mu ?<a href="/register">Üyeol</a>
                                </div>
                            </div>
                            <button type="button" class="btn btn-dark btn-block" onClick={this.HandleLogin}>Giriş Yap</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
