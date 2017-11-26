myApp.controller('custController',['$http','restService',function($http,restService) {

	var main = this;

  this.allRestaurant = function(){


   
      restService.getAll()
      .then(function successCallback(response) {
          if(response.data.status==200){

            main.restaurants = response.data.data;
          
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }

  this.allRestaurant();

  this.toggle = function(res,id,i,state){


      restService.getToggle(id,i,state)
      .then(function successCallback(response) {
          if(response.data.status==200){
            console.log(response.data.data.tables)

            if(state){
              main.restaurants[main.restaurants.indexOf(res)].tables[i].booked=false
            }else{
              main.restaurants[main.restaurants.indexOf(res)].tables[i].booked=true;
            }
          
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }

  this.reviewDo = function(i,id){

      var mydata = {
          review : main.review,
          name : main.name
      }

      restService.reviewDo(id,mydata)
      .then(function successCallback(response) {

          if(response.data.status==200){

            console.log(response.data.data)
            main.restaurants[i] = response.data.data

            main.review="";
            main.name="";
          
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }

}]);