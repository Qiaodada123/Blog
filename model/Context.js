//创建一个Context模型
var mongoose=require('mongoose');

var Schema= new mongoose.Schema({
	name:String,//要知道是谁发表了朋友圈
	title:String,
	context:String,
	pathname:String
});

var modle=mongoose.model('Context',Schema);
module.exports=modle;