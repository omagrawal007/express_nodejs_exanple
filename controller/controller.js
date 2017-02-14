var user_model=function(app,path){
	
	var mysql      = require('mysql');

	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'user_test'
	});
	app.get('/',function(req,res){
		
		res.sendFile(path.join(__dirname+'/../views/index.html'));
	});
	app.post('/user',function(req,res){
	
		connection.query("insert into user_info(name,email,mobile,status,adress) values('"+req.body.name+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.status+"','"+req.body.address+"')", function (error, results, fields) {
  
				var retrunData={};
				if(!error)
				{
						retrunData={"status":1,"code":"3001","message":"success fully insert"};

				}
				else
				{
						retrunData={"status":0,"code":"3002","message":"success fully not insert"};

				}


				
				res.json(retrunData);

		});
	});



	app.post('/updateUser',function(req,res){

		
		

		connection.query("update user_info set name='"+req.body.name+"',email='"+req.body.email+"',mobile='"+req.body.mobile+"',status='"+req.body.status+"',adress='"+req.body.adress+"' where id='"+req.body.id+"'",function(error,results,fields){

				var updateMessage={};

			if(!error)
			{	
				updateMessage={"status":1,"code":"3006","message":"Update sccussfully"};

			}
			else
			{

				updateMessage={"status":1,"code":"3007","message":"Update sccussfully"};


			}
			res.json(updateMessage);
			


		});



	})

	app.get('/one_user',function(req,res){
		console.log(req.query);

		connection.query('select * from user_info where id="'+req.query.user_id+'"',function(error,results,fields){

			if(!error)
			{
				retrunData={"status":1,"code":"3003","message":"data found",data:results};

			}
			else
			{
				retrunData={"status":1,"code":"3004","message":"Data Not Found"};

			}


			res.json(retrunData);

		});



	})
	app.get('/user',function(req,res){

			
			connection.query('select * from user_info limit 5',function(error,results,fields){
				
				var retrunData={};
				if(!error)
				{
						retrunData={"status":1,"code":"3003","message":"data found",data:results};

				}
				else
				{
						retrunData={"status":1,"code":"3004","message":"Data Not Found"};


				}
				res.json(retrunData);

				



			});





	});






}
module.exports=user_model;