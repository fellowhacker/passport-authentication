var express = require('express'),
router = express.Router();


var User = require('../models/user');

router.get('/register', function(req, res) {

	res.render('register');

});

router.get('/login', function(req, res) {

	res.render('login');

});

router.post('/register', function(req, res) {

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var rePassword = req.body.password1;
	console.log(name)

	var newUser = new User({

		name : name,
		email : email,
		username : username,
		password : password

	})

	User.createUser(newUser, function(err, user) {

		if(err) throw wrr;
		console.log(user);

	});

	req.flash('success_msg', 'You are registered')

	res.redirect('/users/login');

}); 

module.exports = router;