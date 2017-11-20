//创建一个User模型
var mongoose=require('mongoose');
// var Schema=mongoose.Schema;

// var obj={
// 	name:String,
// 	email:String,
// 	password:String
// }

var Schema= new mongoose.Schema({
	name:String,
	email:String,
	password:String
});

var modle=mongoose.model('User',Schema);
module.exports=modle;