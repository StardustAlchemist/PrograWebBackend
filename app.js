var express = require('express');
var path = require('path');
var smashRouter = require('./routes/smash');
var createError = require('http-errors');
var app = express();
var redis = require('redis');

const {mongoose} = require('./database');
//Settings
var redisClient = redis.createClient();
app.set('port', process.env.PORT || 3000);
app.use(express.json());

redisClient.on('connect', function() {
  console.log('Conectado a Redis Server');
});

//Routes
app.use('/api/v1/smash', smashRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    
    res.json(err);
    //res.render('error');
  });

app.listen(app.get('port'), () => {
    console.log('Server on Port 3000');
});



