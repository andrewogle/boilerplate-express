
var express = require('express');
var app = express();
const bodyParser = require('body-parser')

// --> 7)  Mount the Logger middleware here
app.use((req, res, next)=>{
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next()
})

// --> 11)  Mount the body-parser middleware  here

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
/** 1) Meet the node console. */

console.log('Hello World')
/** 2) A first working Express Server */
// app.get('/',(req, res)=>res.send('Hello Express'))

/** 3) Serve an HTML file */
const absolutePath = __dirname + '/views/index.html';
app.get('/', (req, res)=> res.sendFile(absolutePath))

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'))

/** 5) serve JSON on a specific route */
app.get('/json',(req, res)=> res.json({"message": response()}))

/** 6) Use the .env file to configure the app */
 const response = ()=>{
   let resp = " "
 if (process.env.MESSAGE_STYLE === 'uppercase'){
  return resp = "Hello json".toUpperCase();
 }else{
   return resp = "Hello json";
 }
 }
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now',(req, res, next)=>{
  req.time = new Date().toString();
  next();
},(req, res)=>{
  res.send({time:req.time})
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo',(req, res)=>{
  res.send({echo:req.params.word})
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name',(req, res)=>{
  const {first: firstname, last: lastname} = req.query;
  res.json({name: `${firstname} ${lastname}`})
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name',(req, res)=>{
  const {first: firstname, last: lastname} = req.body;
  res.json({name: `${firstname} ${lastname}`})
  
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
