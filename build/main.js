'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HTTP REQUEST LOGGER
var app = (0, _express2.default)();

/* setup routers & static directory */
// PARSE HTML BODY

var port = 3000;
var devPort = 4000;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());

/* mongodb connection */
var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongodb server');
});
// mongoose.connect('mongodb://username:password@host:port/database=');
_mongoose2.default.connect('mongodb://127.0.0.1/codelab');

/* use session */
app.use((0, _expressSession2.default)({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.use('/api', _routes2.default);

/* support client-side routing */
app.get('*', function (req, res) {
    console.log('** app.get(');
    res.sendFile(_path2.default.resolve(__dirname, './../public/index.html'));
});
/*
위 작업을 하지 않으면, URL 을 직접 입력하여 들어갔을때 클라이언트사이드 라우팅이 제대로 작동하지 않습니다.
클라이언트에서 링크를 클릭해서 들어갔을때는 작동 하지만요,
한번 URL 을 입력하여 클라이언트 사이드 라우팅을 테스트 해보세요.

http://localhost/login
http://localhost/register

*/

/* handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function () {
    console.log('Express is listening on port', port);
});

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    var config = require('../webpack.dev.config');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);
    devServer.listen(devPort, function () {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}