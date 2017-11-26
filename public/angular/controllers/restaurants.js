

myApp.filter('dateRange', function() {
        return function( items, fromDate, toDate ) {
            var filtered = [];
            //here you will have your desired input
            console.log(fromDate, toDate);
            var from_date = Date.parse(fromDate);
            var to_date = Date.parse(toDate);
            angular.forEach(items, function(item) {
              var bookedDate = new Date(item.bookedDate)
                if(bookedDate > from_date && bookedDate < to_date) {
                  
                    filtered.push(item);
                }
            });

            return filtered;
        };
    });

myApp.controller('homeController',['$http','restService',function($http,restService) {

	var main = this;
  this.tables = [];
  this.Date = window.Date;
	this.showB = function(){
		this.show= 0;
	}

  this.removeTable = function(i){
    main.tables.splice(i,1);
  }

  this.addTable = function(){
    main.tables.push({
      tableNo : main.tableNo,
      capacity : main.capacity
    })

    main.tableNo = "";
    main.capacity = "";
  }

  this.edit = function(){

    var mydata = {
      name: main.name,
      cuisine: main.cuisine,
      address: main.address,
      tables : main.tables
    }
   
      restService.editRest(main._id,mydata)
      .then(function successCallback(response) {
          if(response.data.status==200){
            
            main.requested = 'true';
            main.restaurants[main.i] = response.data.data;
            main.editflag = false;
            main._id =  ""
            main.name = ""
            main.cuisine = ""
            main.address = ""
            main.tables = null;


          
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }
  var is;
  this.editTable = function(i){
    is =i ;
    main.tableNo = main.tables[i].tableNo;
    main.capacity = main.tables[i].capacity;
    main.edita = true;
  }

  this.ediTable = function(){
    main.tables[is] = {
      tableNo: main.tableNo,
      capacity: main.capacity
    }
    main.edita = false;
    main.tableNo="";
    main.capacity ="";

  }

	this.find = function(){

    if( main.editflag === true){
      return main.edit();
    }

	  main.requested = "loading";

    var mydata = {
      name: main.name,
      cuisine: main.cuisine,
      address: main.address,
      tables : main.tables
    }
   
      restService.addRest(mydata)
      .then(function successCallback(response) {
          if(response.data.status==200){
            
            main.requested = 'true';
            main.restaurants.push(response.data.data);

          
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


	}

  this.editrest = function(obj){
    main.i = main.restaurants.indexOf(obj);
    main.editflag = true;
    main._id =  main.restaurants[main.i]._id;
    main.name = main.restaurants[main.i].name;
    main.cuisine = main.restaurants[main.i].cuisine;
    main.address = main.restaurants[main.i].address;
    main.tables = main.restaurants[main.i].tables;
  }

  

  this.allRestaurant = function(){


   
      restService.getAll()
      .then(function successCallback(response) {
          if(response.data.status==200){
            

            main.restaurants = response.data.data;
            console.log(main.restaurants)
          
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }

  this.allRestaurant();


  this.delete = function(i,id){


   
      restService.deleteres(id)
      .then(function successCallback(response) {
          if(response.data.status==200){


            main.restaurants.splice(i,1)
            
          }else{
            alert(response.data.msg)
          }
          

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }

}]);