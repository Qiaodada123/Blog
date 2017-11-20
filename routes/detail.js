var express = require('express');
var router = express.Router();
var Context=require('../model/Context');


//查找全部朋友圈
router.get('/', function(req, res, next){
	Context.find({_id:req.query.id}).then(result=>{
		res.render('detail', {isShow:false,detailInfo:result[0]});
	})
	
 	
});



module.exports = router;


// { __v: 0,
//   name: 'cc',
//   title: '1',
//   context: '345456',
//   _id: 59f3f5fe8f230a25d00988fb }