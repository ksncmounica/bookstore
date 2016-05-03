var express = require('express');
var app = express();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User   = require('../models/user'); 
// API ROUTES -------------------

// get an instance of the router for api routes
var router = express.Router(); 

app.set('superSecret', config.secret); 

router.get('/adminsetup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    username: 'admin', 
    password: 'admin',
    role: 'admin' 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;
    var token = jwt.sign({user:'testuser'},app.get('superSecret') , {
                        expiresIn: '24h' // expires in 24 hours
                    });
    console.log('admin saved successfully');
    res.json({
                        success: true,
                        username: 'admin',
                        message: 'successful',
                        token: token
                        
                    });
  });
});

// TODO: route to create a user (POST http://localhost:3000/create)
router.post('/createuser', function(req, res) {

  // create a sample user
  var nick = new User({ 
  username: req.body.name,
  email: req.body.email,
  password: req.body.password,
  role:'user'
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// TODO: route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// TODO: route to login a user (POST http://localhost:3000/login)
router.post('/userlogin', function(req, res) {
    // find the user
    var criteria = { $or: [{ username: req.body.username }, { email: req.body.email }] };

    User.findOne(criteria, function(err, user) {

        if (err) {
            res.send(err);
            return;
        }

        if (!user) {
            res.status(500).json({ success: false, message: 'Authentication failed. User not found.' });
            return;
        } else if (user) {
            if (user.password != req.body.password) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              }
                else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({user:'testuser'},app.get('superSecret') , {
                        expiresIn: '24h' // expires in 24 hours
                    });

                    console.log(JSON.stringify(user));
                    console.log(JSON.stringify(req.body));

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        username: req.body.username,
                        message: 'Login successful',
                        token: token
                        
                    });
                }            
        }
    });
});

// route to return all users (GET http://localhost:3000/users)
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

module.exports = router;
