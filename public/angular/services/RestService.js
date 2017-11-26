myApp.service('restService', function($http){

	
	this.getAll = function(){

		return $http.get('/all');

	} 

	this.getToggle = function(id,i,state){
		
		return $http.get('./toggle/'+id+"/"+i+"/"+state)

	} 

	this.reviewDo = function(id,data){

		return $http.post('./add/review/'+id,data);

	} 

	this.editRest = function(id,data){

		return $http.put('./editRestaurant/'+id,data);

	} 

	this.addRest = function(data){

		return $http.post('./addRestaurant',data);

	} 

	this.deleteres = function(id){

		return $http.post('./'+id+'/delete');

	}



});