var express = require('express');
var path = require('path');
var smashRouter = require('./routes/smash');
var createError = require('http-errors');
var app = express();
const cors = require('cors');

const {mongoose} = require('./database');

//Settings

app.set('port', process.env.PORT || 3000);
app.use(express.json());
//app.use(cors({origin: '*'}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
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



