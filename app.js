var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//--------------连接数据库---------
require('./databace.js');
//----------------------------------
//---------引入session--------------
var session=require('express-session');
//---------引入session--------------

var index = require('./routes/index');
var users = require('./routes/users');
//自定义
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var CircleFriends=require('./routes/CircleFriends');
var detail = require('./routes/detail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//---------使用session--------------
app.use(session({
	name:'qiaoSessionId',     //sessionId    自己随意定义
	secret:'sufiyfieyutyerug',      //加密的
	cookie:{maxAge:1000 * 60 * 60},   //设置cookie的有效时间
	resave:true,                      //重新登录设置时长
	saveUninitialized:true            //只要访问接口就会生成一个cookie，但是此时的cookie:sessionId是无效的
}))
//---------使用session--------------



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//自定义
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/CircleFriends', CircleFriends);
app.use('/detail', detail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
