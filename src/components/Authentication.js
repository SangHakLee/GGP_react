import React from 'react';
import { Link } from 'react-router';



class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    // 로그인 핸들러
    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(

            // Login 컨테이너의 handleLogin 에서 리턴한 값
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    // 회원가입 핸들러
    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    }

    // 엔터키 눌렀을 때 핸들러
    handleKeyPress(e) {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render() {

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                    name="username"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.username}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
          <div>
              <div className="card-content">
                  <div className="row">
                      {inputBoxes}
                      <a className="waves-effect waves-light btn"
                        onClick={this.handleLogin} >전송</a>
                  </div>
              </div>


              <div className="footer">
                  <div className="card-content">
                      <div className="center" >
                        <Link to="/register">회원가입</Link>
                      </div>
                  </div>
              </div>

          </div>
        );

        const registerView = (
          <div className="card-content">
              <div className="row">
                  {inputBoxes}
                  <a className="waves-effect waves-light btn"
                    onClick={this.handleRegister}>가입</a>
              </div>
          </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">아마따</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "로그인" : "회원가입"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};

export default Authentication;
