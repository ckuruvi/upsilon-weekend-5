var express = require('express');
var config = {database: 'upsilon'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);


router.get('/',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'SELECT * FROM giphy;',
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of get



router.post('/',function(req,res){
  console.log('req.body::',req.body);
  console.log('****',req.body.params.data.imageUrl,req.body.params.data.comment);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'INSERT INTO giphy(url,description) VALUES($1,$2) returning *;',
      [req.body.params.data.imageUrl, req.body.params.data.comment],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of post


router.delete('/:id',function(req,res){
      pool.connect(function(err,client,done){
        if(err){
          console.log('Error connecting to DB',err);
          res.sendStatus(500);
          done();
        } else {
          console.log('paramId ::'+req.params.id);
          client.query(
            'DELETE FROM giphy WHERE id=$1;',
            [req.params.id],
            function(err,result){
              done();
              if(err){
                console.log('Error querying DB',err);
                res.sendStatus(500);
              } else {
                console.log('Posted info from DB',result.rows);
                res.send(result.rows);
              }
            });
          }
        });
      });//end of delete

      
module.exports = router;
