import React from 'react';

// a 태그 대신에 react-router 의 Link 컴포넌트를 사용했는데요,
// 이 컴포넌트는 페이지를 새로 로딩하는것을 막고, 라우트에 보여지는 내용만 변하게 해줍니다
// (만약에 a 태그로 이동을하게된다면 페이지를 처음부터 새로 로딩하게됩니다)
import { Link } from 'react-router';

class Header extends React.Component {
    render() {
        const loginButton = (
            <li>
                <Link to="/login">
                  <i className="material-icons">perm_identity</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
          <nav>
              <div className="nav-wrapper blue darken-1">
                  <Link to="/" className="brand-logo center">
                    <i className="material-icons">cloud 아마따 cloud</i>
                  </Link>

                  <ul>
                      <li><a><i className="material-icons">search</i></a></li>
                  </ul>

                  <div className="right">
                      <ul>
                          { this.props.isLoggedIn ? logoutButton : loginButton }
                      </ul>
                  </div>
              </div>
          </nav>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

// 로그인 여부에 따라 버튼 달리 보여줌
Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;
