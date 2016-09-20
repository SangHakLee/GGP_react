import express from 'express';
import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';
import session from 'express-session';


/* setup routers & static directory */
import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;


app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://127.0.0.1/codelab');

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', api);

/* support client-side routing */
app.get('*', (req, res) => {
  console.log('** app.get(')
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});
/*
위 작업을 하지 않으면, URL 을 직접 입력하여 들어갔을때 클라이언트사이드 라우팅이 제대로 작동하지 않습니다.
클라이언트에서 링크를 클릭해서 들어갔을때는 작동 하지만요,
한번 URL 을 입력하여 클라이언트 사이드 라우팅을 테스트 해보세요.

http://localhost/login
http://localhost/register

*/

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
