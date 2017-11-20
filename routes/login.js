var express = require('express');
var router = express.Router();
var User=require('../model/User');


router.get('/', function(req, res, next) {
  res.render('login', {isShow:false});
});

router.post('/', function(req, res, next) {
	User.find({email:req.body.email,password:req.body.password}).then(result=>{
		//console.log(result)
		if(result.length==1){
			//设置cookie值，用于登录成功后显示是哪个用户登录的
			res.cookie('userInfo',{name:result[0].name});
			//点击登录跳转页面之前，要做一件事,让sessionId有效（钥匙）
			req.session.qiaoInfo=result[0];
			res.redirect('/');
		}else{
			res.render('login', {isShow:true});
		}
	})
	
  
});







module.exports = router;









