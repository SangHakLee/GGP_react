'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PARSE HTML BODY

var app = (0, _express2.default)(); // HTTP REQUEST LOGGER

var port = 3000;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());

app.use('/', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.get('/hello', function (req, res) {
    return res.send('Hello CodeLab');
});

app.listen(port, function () {
    console.log('Express is listening on port', port);
});