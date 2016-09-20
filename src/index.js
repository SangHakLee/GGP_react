import React from 'react';
import ReactDOM from 'react-dom';
// 라우터 사용
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// 추가된 컨테이너들
import { App, Home, Login, Register } from 'containers';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
        </Route>
    </Router>, rootElement
);
