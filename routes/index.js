var express = require('express');
var router = express.Router();
var Context=require('../model/Context');

//-----------------配置multer，设置存储路径以及文件名字--------
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {//设置路径(放在public文件夹下)
    cb(null, 'public/qiaophoto')   //相当于写操作  fs.write
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())//利用时间撮保证每个文件名的唯一性
    //fieldname就是设的name属性的值
  }
})
var upload = multer({ storage: storage })
//-----------------配置multer，设置存储路径以及文件名字--------


//查找全部朋友圈
router.get('/', function(req, res, next) {
	//{ userInfo: { email: 'bb@qq.com', password: '123' } }
	 if(req.session.qiaoInfo){
	 	Context.find({name:req.session.qiaoInfo.name}).then(result=>{
	 		//获取cookie值，来获取用户名
		 	var userName=req.cookies['userInfo'].name;
	  		res.render('index', {userName:userName,list:result});
	 	})
	 	
	 }else{
	 	res.redirect('/login');
	 }
 	
});

//点击修改--把原先的数据填自动填写的到input框里
router.get('/modify', function(req, res, next) {
	Context.find({_id:req.query.id}).then(result=>{
		// res.render('CircleFriends', {isShow:false,content:result[0]});
		res.render('CircleFriends', {isShow:false,isnotNew:false,content:result[0]});
	})
	
});

//点击修改
 router.post('/update',upload.single('qiaophoto'), function(req, res, next){
	Context.findByIdAndUpdate({_id:req.body.id},{$set:{title:req.body.title,context:req.body.context,pathname:`/qiaophoto/${req.file.filename}`}})
	.then(result=>{
		console.log(result,121212124546546)
		res.redirect('/')
		// res.render('CircleFriends', {isShow:false,isnotNew:false,content:result[0]});
	})
	
}); 




//删除
router.get('/removing', function(req, res, next) {
	Context.findByIdAndRemove({_id:req.query.id}).then(result=>{
		res.redirect('/');
		// res.render('CircleFriends', {isShow:false,isnotNew:false,content:result[0]});
	})

	// Context.findByIdAndRemove(req.query.id).then(result=>{
	// 	res.redirect('/');
	// 	// res.render('CircleFriends', {isShow:false,isnotNew:false,content:result[0]});
	// })
});


module.exports = router;
