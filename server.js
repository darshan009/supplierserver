var express = require('express');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');
var Supplier = require('./models/Supplier');

var app = express();

//mongoose connection
mongoose.connect("mongodb://supply:supply123@ds023500.mlab.com:23500/supply");
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function callback(){
  console.log("Mongoose connected to mongolab");
});


app.get('/', function(req, res, next){
  var category = req.query.category;
  if (req.query.category)
    category  = {category : {
      $regex : req.query.category
    }}
  else {
    category = null;
  }
  var page = parseInt(req.query.page),
     skip = req.param('page') > 0 ? req.param('page') : 0;
  Supplier.find(category, null, {
     skip: 10 * skip,
     limit: 10
  }, function (err, data) {
    console.log(data);
     if(err) {
        res.json(500, err);
     }
     else {
        res.send(data);
      }
  });
});

app.get('/supplier', function(req, res, next){
  var category = req.query.category;
  var page = parseInt(req.query.page),
     skip = req.param('page') > 0 ? req.param('page') : 0;
  Supplier.find({category : {$regex: category}}, null, {
     skip: 10 * skip,
     limit: 10
  }, function (err, data) {
    console.log(data);
     if(err) {
        res.json(500, err);
     }
     else {
        res.send(data);
      }
  });
});

//each suppliers
app.get('/supplier/:id', function(req, res, next) {
  Supplier.findOne({id : req.params.id}).exec(function(err, supplier) {
    res.send(supplier);
  });
});


//listen
var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server connected");
});
