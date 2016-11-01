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
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

	handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    render() {
		const inputBoxes = (
			<div>
				<div className="input-field col s12 username">
					<label>아이디</label>
					<input
					name="username"
					type="text"
					className="validate"
                    onChange={this.handleChange}
                    value={this.state.username}/>
				</div>
				<div className="input-field col s12">
					<label>비밀번호</label>
					<input
					name="password"
					type="password"
					className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}/>
				</div>
			</div>
		);

		const loginView = (
			<div>
                <div className="card-content">
                    <div className="row">
						{inputBoxes}
                        <a className="waves-effect waves-light btn" onClick={this.handleLogin}>로그인</a>
                    </div>
                </div>

                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
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
                    <a className="waves-effect waves-light btn">회원가입</a>
                </div>
            </div>
	    );

        return (
			<div className="container auth">
                <Link className="logo" to="/">아마따</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
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
    mode: true, // login.js register.js 에서 값을 설정한다.
    onLogin    : (id, pw) => { console.error("onLogin 실패"); },
    onRegister : (id, pw) => { console.error("onRegister 실패"); }
};

export default Authentication;
