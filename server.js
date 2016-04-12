var express = require('express');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');
var Supplier = require('./models/Supplier');

var app = express();

//mongoose connection
mongoose.connect("mongodb://<supply>:<supply123>@ds023500.mlab.com:23500/supply");
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function callback(){
  console.log("Mongoose connected to mongolab");
});

//views, bodyparser, cookieParser, session
app.set("views",__dirname+"/views");
app.set('view engine', 'jade');
app.use(express.static(__dirname+'/'));

app.get('/', function(req, res, next){
  var page = parseInt(req.query.page),
     skip = req.param('page') > 0 ? req.param('page') : 0;
  Supplier.find(null, null, {
     skip: 10 * skip,
     limit: 10
  }, function (err, data) {
     if(err) {
        res.json(500, err);
     }
     else {
       Supplier.find().exec(function(err, fullList) {
       //console.log(data);
       var fullListLength = fullList.length;
       console.log(fullListLength);
        res.render('main', {
           data: data,
           fullListLength : fullListLength
        });
      });
     }
  });
});

//each suppliers
app.get('/suppliers/:id', function(req, res, next) {
  Supplier.findOne({id : req.params.id}).exec(function(err, found) {
    console.log(found);
    res.render('supplierProfile', {found : found});
  });
});


//listen
var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server connected");
});
