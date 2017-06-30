var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	expressHandlebars = require('express-handlebars'),
	expressValidator = require('express-validator'),
	flash = require('connect-flash'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	mongo = require('mongodb'),
	mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authen');
var  db = mongoose.connection;

var routes = require('./routes/index'),
	users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended : false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	saveUninitializes: true,
	resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

// express validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

app.use(function(req, res, next) {

	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash("error");
	res.locals.user = req.user || null;
	next();

})

app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 8080))

app.listen(app.get('port'), function() {

	console.log("Server Started");

})