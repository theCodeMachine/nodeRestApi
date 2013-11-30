/** Application Dependencies */
var express = require('express');
var mysql = require('mysql');

/** New Application ENV OBJ */
var app = express();

/** Initiate Mysql Connection */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database :'todo_demo',
  password : ''
});

connection.connect();

/** Actions */
app.get('/',function(req,res){
	res.send('<h1>Todo Service</h1>');
});

/** get all todos */
app.get('/api/todo',function(req,res){
	var results;
	connection.query('SELECT * from todos where is_done = \'0\'', function(err, rows, fields) {
	  if (err) throw err;

	  results = rows;
		res.type('application/json');
		res.send(results);
	});
});

/** add new todo */
app.post('/api/todo',function(req,res){
	connection.query('INSERT INTO todos (title,added_on) VALUES(\''+ req.body.title +'\',NOW())', function(err,result) {
	  if (err) throw err;

	  if(result)
	  	res.type('application/json');
	  	res.send([{"added":1}]);
	});
});

/** Update a Todo */
app.put('/api/todo/:id',function(req,res){
	connection.query('UPDATE todos SET is_done = 1, ended_on = NOW() where id = '+req.params.id, function(err,result) {
	  if (err) throw err;

	  if(result)
	  	res.type('application/json');
	  	res.send([{"updated":1}]);
	});
});

/** Delete a TODO */
app.delete('/api/todo/:id',function(req,res){
	connection.query('DELETE from todos where id = '+req.params.id, function(err,result) {
	  if (err) throw err;

	  if(result)
	  	res.type('application/json');
	  	res.send([{"deleted":1}]);
	});
});


app.listen(3000);