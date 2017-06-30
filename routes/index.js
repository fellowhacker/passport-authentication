var express = require('express'),
router = express.Router();

router.get('/', isAuthen, function(req, res) {

	res.render('index');

});

function isAuthen(req, res, next) {
	if(req.isAuthenticated()) {

		return next();
	}
	
	else {
	
		res.redirect('users/register');

	}	
}
module.exports = router;