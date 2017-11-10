const express = require('express')
const sockApp = require('express')();
const dataApp = require('express')();
const https = require('https')
const bodyParser = require('body-parser');
const config = require('./config.js');
const cors = require('cors')
const path = require('path')
const fs= require('fs')

// const corsOptions = {
//   origin: ['http://localhost:3000','http://192.168.2.40:3000/']
// }
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

const sockAppServer = https.createServer(httpsOptions, sockApp)
const dataAppServer = https.createServer(httpsOptions, dataApp)
const io = require('socket.io')(sockAppServer);

dataApp.use(cors())
// dataApp.options('/users',cors(corsOptions))
// dataApp.options('/languages',cors(corsOptions))
dataApp.use((req,res,next)=>{
  // console.log(req)
  // console.log(res)
  next();
})

dataApp.use(bodyParser.json());
dataApp.use(bodyParser.urlencoded({ extended: true }));
dataApp.use('/',express.static('build'));

require('./routes')(dataApp);
require('./socket')(io);


sockAppServer.listen(3001, ()=>{
  console.log('listening for WebSockets port:3001');
});

dataAppServer.listen(8080, ()=>{
  console.log('listening for data requests port:8080')
})

// dataApp.listen(8080, ()=>{
//   console.log('listening for data requests port:8080');
// });
