const express = require('express')
const sockApp = require('express')();
const dataApp = require('express')();
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config.js');
const cors = require('cors')

dataApp.use((req,res,next)=>{
  // console.log(req)
  // console.log(res)
  next();
})

dataApp.use(logger('dev'));
sockApp.use(logger('dev'))

dataApp.use(bodyParser.json());
dataApp.use(bodyParser.urlencoded({ extended: true }));
dataApp.use('/',express.static('build'));

require('./routes')(dataApp);

// catch 404 and forward to error handler
dataApp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
dataApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.dataApp.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = {
  app: dataApp,
  socket: sockApp
};


// dataApp.listen(8080, ()=>{
//   console.log('listening for data requests port:8080');
// });
