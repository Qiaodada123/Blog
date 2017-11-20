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


//跳转到发表页面
router.get('/', function(req, res, next) {

  res.render('CircleFriends', {isShow:false,isnotNew:true});
 // res.render('CircleFriends', {isShow:false});  //错误
});

//点击发表   qiaophoto指的是文件的  name='qiaophoto'
//upload.single('qiaophoto')作用：拿到name='qiaophoto'这个属性里面存放的图片值
router.post('/', upload.single('qiaophoto'),function(req, res, next){
	//发表朋友圈之前先判断用户是否登录，如果登录则直接发表，如果未登录则先跳转到登录页面
	
	if(req.session.qiaoInfo){
		console.log(req.body,req.file,222222222)
		//console.log(req.session.qiaoInfo,1111111111111)
		Context.create({
			name:req.session.qiaoInfo.name,
			title:req.body.title,
			context:req.body.context,
			pathname:`/qiaophoto/${req.file.filename}`  //把图片信息传到数据库中
		}).then(result=>{                              
			res.redirect('/');
			//console.log(result);                           
		})

	}else{
		res.redirect('/login');
	}
 
});






module.exports = router;









