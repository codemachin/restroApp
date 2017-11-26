var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tables = new Schema({

  tableNo:{type:Number,required:true},
  capacity:{type:Number,required:true},
  booked:{type:Boolean,default:false},
  bookedDate:{type:Date,default:0}

});

var review = new Schema({

  review:{type:String,required:true},
  name:{type:String,required:true}
});

var restSchema = new Schema({

  name : {type:String,default:"",required:true},
  address :  {type:String,default:"",required:true},
  cuisine : {type:String,default:"",required:true},
  review : [review],
  tables    : [tables],
  created : {type:Date,default:Date.now},
  updated : {type:Date,default:Date.now}

});

mongoose.model('Rest',restSchema);