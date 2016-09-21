import React from 'react';
import { Link } from 'react-router';



class Authentication extends React.Component {
    render() {

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                    name="username"
                    type="text"
                    className="validate"/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"/>
                </div>
            </div>
        );

        const loginView = (
          <div>
              <div className="card-content">
                  <div className="row">
                      {inputBoxes}
                      <a className="waves-effect waves-light btn">Login</a>
                  </div>
              </div>


              <div className="footer">
                  <div className="card-content">
                      <div className="center" >
                        <Link to="/register">Join</Link>
                      </div>
                  </div>
              </div>

          </div>
        );

        const registerView = (
          <div className="card-content">
              <div className="row">
                  {inputBoxes}
                  <a className="waves-effect waves-light btn">CREATE</a>
              </div>
          </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">아마따 Authentication</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "JOIN"}</div>
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
