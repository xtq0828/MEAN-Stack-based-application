var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var Todo = mongoose.model( 'Todo' , {
	text: String
});

mongoose.connect('mongodb://localhost:27017/angular-todo');

app.use(express.static('./public'));

app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});

app.post('/api/todos', function(req, res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo) {
		if(err) {
			res.send(err);
		}
		else console.log(todo);
		
	});
	Todo.find(function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});

app.delete('/api/todos/:todo', function(req, res) {
	Todo.remove( {
		_id: req.params.todo
	}, function(err, todo) {
		if(err) {
			res.send(err);
		}
		Todo.find(function(err, todos) {
			if(err) {
				res.send(err);
			}
			res.json(todos);
		});
	});
});

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, function() {
	console.log('App listening on port 8080');
});