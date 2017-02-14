var app=angular.module('testApp',['ui.router','ui.bootstrap']);
app.controller('homeController',['$rootScope','$scope','httpCommanRequst','$uibModal','$timeout',function($rootScope,$scope,httpCommanRequst,$uibModal,$timeout){
	 
		$rootScope.update=2;

	 $scope.adduser = function(){

	 	$rootScope.update=1;


	 	$rootScope.userPopup=$uibModal.open({          
          templateUrl:'tamplate/user_modal.tmpl',
          controller: 'homeController'         
        });
	 }


	 $scope.updateInfo=function(id){

	 


	 		console.log($scope.userupdate);



	 	var methodName='updateUser';
	 	httpCommanRequst.postMethod($scope.userupdate,methodName,function(response){
		 		if(response.code==3006)
		 		{

		 			alert("update success fully ");
		 			$scope.getUserList();	
		 			$rootScope.userPopup.close();

		 		}
	 			else
		 		{
		 				alert("Some problem");

		 		}

		 	
		 		
	 	})



	 }

	$scope.showViewUser=function(postData){

	 		$rootScope.userViewPopup=$uibModal.open({          
          templateUrl:'tamplate/view.tmpl',
          controller: 'homeController'         
        });
	 	$rootScope.userupdate=postData;
	 	$rootScope.userupdate.status=postData.status.toString();


	}
	 $scope.updateUserInfo=function(postData){
	 
	 		$rootScope.userUpdatePopup=$uibModal.open({          
          templateUrl:'tamplate/user_update.tmpl',
          controller: 'homeController'         
        });
	 	$rootScope.userupdate=postData;
	 	$rootScope.userupdate.status=postData.status.toString();


	 }


	 $scope.closePopup=function(){	
	 	$rootScope.userPopup.close();
	 	$rootScope.userUpdatePopup.close();
	 	
	 }

	 $scope.addUserInfo=function(){
	 	var methodName='user';
	 	httpCommanRequst.postMethod($scope.user,methodName,function(response){
		 		if(response.code==3001)
		 		{

		 			alert("success fully inserted");
		 			$scope.getUserList();	
		 			$rootScope.userPopup.close();

		 		}
	 			else
		 		{
		 				alert("success fully not inserted");

		 		}

		 	
		 		
	 	})
	 }
	 $scope.updateUser=function(userId){
	 	var methodName="one_user?user_id="+userId;
	 	
	 	httpCommanRequst.getMethod(methodName,function(response){
	 		
	 		console.log(response);
	 		$scope.adduser();




	 		// $scope.code=response.code;
	 		// $scope.userLists={};
	 		if(response.code==3003)
	 		{


	 		}
	 	});

	 	

	 }

	 $scope.getUserList=function(){
	 	var methodName="user"
	 	
	 	httpCommanRequst.getMethod(methodName,function(response){
	 		$scope.code=response.code;
	 		$scope.userLists={};
	 		if(response.code==3003)
	 		{
	 			
	 			$scope.userLists=response.data;

	 		}
	 		else
	 		{
	 			$scope.userLists="data not found";
	 		}

	 	})
	 }

}]);

app.config(function($stateProvider,$urlRouterProvider){

	$stateProvider
	 .state('home',{
    url:'/home',
    templateUrl:'tamplate/home.tmpl',
    controller:"homeController"
  });
	$urlRouterProvider.otherwise('/home');

	// $urlrouterprovider.otherwise('/home');

});

app.service('httpCommanRequst',function($http){

	this.postMethod=function(postData,url,callback)
	{
		// postData=JSON.stringify(postData);
		 $http({
    url: 'http://localhost:3000/'+url,
    method: 'Post',
    data: postData,
    headers: {'Content-Type':"application/x-www-form-urlencoded"},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    dataType:"text"
   }).success(function(response) {
                callback(response);
            })

	}
	this.getMethod=function(url,callback)
	{

		 $http({
    url: 'http://localhost:3000/'+url,
    method: 'Get',
    dataType:"json"
   }).success(function(response) {
                callback(response);
            })
	}




});