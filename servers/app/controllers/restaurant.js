var mongoose = require('mongoose');
var responseGenerator = require('./../../libs/responseGenerator');
var restModel = mongoose.model('Rest');

/*------------------Routing Started ------------------------*/

module.exports.controllerFunction = function(app) {


    app.get('/all',function(req,res){
        restModel.find({},function(err,allRestaurants){
            if(err){                
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else{

                var myResponse = responseGenerator.generate(false,"retrieved successfully",200,allRestaurants);
                res.send(myResponse);

            }

        });

    }); // get all restaurants

    app.post('/addRestaurant',function(req,res){

        if(req.body.name!=undefined && req.body.address!=undefined && req.body.cuisine!=undefined){

            var newRestaurant = new restModel({
                
                name : req.body.name,
                address :  req.body.address,
                cuisine : req.body.cuisine


            });

            newRestaurant.tables.push.apply(newRestaurant.tables, req.body.tables);

            console.log(newRestaurant)

            newRestaurant.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,"email already exists in database",500,null);
                    res.send(myResponse);
                   

                }
                else{

                   var myResponse = responseGenerator.generate(false,"success",200,newRestaurant);
                   res.send(myResponse);
                  
                }

            });//end new restaurant save


        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            res.send(myResponse);

            

        }
        

    });//end save new restaurant


    app.put('/editRestaurant/:id',function(req,res){

        var update = req.body;

        restModel.findOneAndUpdate({'_id': req.params.id},update,{new:true},function(err,allRestaurants){
            if(err){                
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else{

                var myResponse = responseGenerator.generate(false,"retrieved successfully",200,allRestaurants);
                res.send(myResponse);

            }

        });

    });// end edit restaurant

    app.get('/toggle/:id/:i/:state',function(req,res){

        if(req.params.state==="true"){
            var update = false;
            var dQuery = {"tables.$.booked" : update,"tables.$.bookedDate" : 0}
        }else{
            var update = true;
            var dQuery = {"tables.$.booked" : update,"tables.$.bookedDate" : Date.now()}
        }
        var index = parseInt(req.params.i);
        console.log(index + typeof(index))

        restModel.findOneAndUpdate({'tables._id': req.params.id},{$set:dQuery},{upsert:true,new:true},function(err,table){
            if(err){                
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else{


                var myResponse = responseGenerator.generate(false,"retrieved successfully",200,table);
                res.send(myResponse);

            }

        });

    }); // toggle restaurant booking status


    app.post('/add/review/:id',function(req,res){
        

        var update =  {
                            review:req.body.review,
                            name: req.body.name

                        };
    

        restModel.findOneAndUpdate({'_id': req.params.id},{
            '$push':{'review': update }
        },{new: true},
                function(err,result){
                    if(err){

                        var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                        res.send(myResponse);  

                    }
                    else{

                       var myResponse = responseGenerator.generate(false,"Question added successfully",200,result);
                       res.send(myResponse);   
                       
                    }

                });
    })
    // end adding review for a restaurant

   

    app.post('/:id/delete',function(req,res) {

      restModel.remove({'_id':req.params.id},function(err,result){

        if(err){
          console.log('some error');
          console.log(err);
          var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
          res.send(myResponse);

        }
        else{
          var myResponse = responseGenerator.generate(false,"query deleted successfully",200,result);
          res.send(myResponse);
        }


      });

    }); // end delete restaurant



}