var express = require('express');
var path = require('path');
var smashRouter = require('./routes/smash');
var app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());

//Routes
app.use('/api/v1/smash', smashRouter);


app.listen(app.get('port'), () => {
    console.log('Server on Port 3000');
});



