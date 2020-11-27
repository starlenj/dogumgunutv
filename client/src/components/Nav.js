import React, { Component } from 'react'
import { Post } from '../helper/Service';

export default class HeaderNav extends Component {
    state = { IsLoggedIn: false }
    componentDidMount() {
        if (this.props.session.length > 0) {
            this.setState({ IsLoggedIn: true })
        }
    }


    render() {
        return (

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Doğum Günü TV</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" />
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            {this.state.IsLoggedIn === false && (
                                <li class="nav-item float-right">
                                    <a class="nav-link" href="/login">Giriş</a>
                                </li>
                            )}
                            {this.state.IsLoggedIn === false && (
                                <li class="nav-item float-right">
                                    <a class="nav-link" href="/register">Kayıt Ol</a>
                                </li>
                            )}


                            {this.state.IsLoggedIn === true && (
                                <li class="nav-item float-right">
                                    <a class="nav-link" href="/Logout">Ayarlar</a>
                                </li>
                            )}
                            {this.state.IsLoggedIn === true && (
                                <li class="nav-item float-right">
                                    <a class="nav-link" href="/Logout">Çıkış</a>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
