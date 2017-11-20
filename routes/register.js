var express = require('express');
var router = express.Router();
var User=require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {isShow:false});
});

router.post('/', function(req, res, next) {
	//{ username: 'aa', email: 'aa@qq.com', password: '123' }
	
	//注册前判断是否邮箱已经被注册过 思路：点击注册跳转页面之前前先去数据库通过find查找
	//req.body.email，判断返回来的结果长度是否为0，如果为0表示为查到到，则插入数据库，
	//如果为1,则表示该邮箱已经被注册,弹出邮箱已被注册信息，重新渲染注册页面
	
	
	// User.find({'email':req.body.email}).then((result)=>{
	// 	if(result.length==0){
	// 		 User.create({
	// 	    	name:req.body.username,
	// 	    	email:req.body.email,
	// 	    	password:req.body.password
	// 	    }).then(function(result){
	// 	res.redirect('/login');
	// })
	// 	}else{
	// 		  res.render('register', {isShow:true});
	// 	}
	// })
    
	User.find({'email':req.body.email}).then((result)=>{
		if(result.length==0){
			return User.create({
		    	name:req.body.username,
		    	email:req.body.email,
		    	password:req.body.password
		    })
		}else{
			  res.render('register', {isShow:true});
		}
	}).then(function(result){
		//这个then里面的回调函数在create里面的promise 的 resolve()调用之后才会执行
		res.redirect('/login');
	})

  
});







module.exports = router;









