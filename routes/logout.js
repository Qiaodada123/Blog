var express = require('express');
var router = express.Router();



//退出登录
router.get('/', function(req, res, next) {
//摧毁房间，也就是让req.session这个对象销毁掉，不存在了这个空间，即使有钥匙了也无法开门
	req.session.destroy(()=>{
  		res.redirect('/login');
  	})
});








module.exports = router;