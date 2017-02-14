var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var path=require('path');

	app.use(bodyparser.urlencoded({extended :true}));
	app.use(bodyparser.json());
	// console.log(path.join(__dirname+'/views/'));
	app.use(express.static(path.join(__dirname+'/views/')));
	
var userApp=require('./controller/controller.js')(app,path);







app.listen('3000',function(){

	console.log("localhost:3000");

});