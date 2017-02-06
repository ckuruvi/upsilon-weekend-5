var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');

var favoriteGiphys= require('./routes/favoritegiphys');

var app=express();

//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/favoritesgiphys',favoriteGiphys);


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'public','views','index.html'));
})


var port=process.env.PORT || 3000;
var server=app.listen(port,function(){
  console.log('listening on port',server.address().port);
});
