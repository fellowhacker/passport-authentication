var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;


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


passport.use(new LocalStrategy(
  function(username, password, done) {
    
  	User.getUserByUsername(username, function(err, user) {

  		if(err) throw err;

  		if(!user) {
  			return done(null, false, {message: 'Unknown User'});
  		}

  		User.comparePassword(password, user.password, function(err, ismatch) {

  			if(err) throw err;

  			if(ismatch) {

  				return done(null, user);

  			}
  			else {
 
  				return done(null, false, {message : 'Invalid password'});

  			}

  		})

  	});

  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',

	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}), 

	function(req, res) {

		res.redirect('/');

	});

router.get('/logout', function(req, res) {

	req.logout();

	req.flash('success_msg', 'Logged out');

	res.redirect('/users/login');

})

module.exports = router;