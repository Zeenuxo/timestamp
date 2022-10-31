//To load .env file we must load dotenv package
const dotenv = require('dotenv');

//To use it we must call configure()
dotenv.config();






//Loading Packages
const express = require('express');
const app = express();
const cors = require('cors');






//Middleware:
//Enable CORS - Cross Origin Resource 
app.use(cors({optionsSuccessStatus: 200}));  

//Serve the request with index.html
//object.method(path, handler)
app.get('/', function(req,res){
  const filePath =__dirname + '/views/index.html';
    res.sendFile(filePath);
  });

//app.use(path, middlewareFunction)
//Gives us access to static assets like Style.css
const style = __dirname + '/public';
app.use('/public', express.static(style));








//API Routes - Endpoints:
// Route 1: Our 1st API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'Hello, you have just used an API endpoint :)'});
});


//Route 2: After api endpoint - If there is Empty Parameter then return with response Current Date & Time
app.get("/api",function(req, res){
  res.json({
    unix: new Date().getTime(), 
    utc:  new Date().toUTCString() 
});
});


//Route 3: After api endpoint - If there is Unix Time in 13 Digits then then return with response:
app.get("/api/:timestamp", function(req, res){

  //Incoming unix parameter will be a String
  const timeString = req.params.timestamp;
  console.log(timeString)

  //Convert String to Number
  const timeNumber = Number(timeString);
  console.log(timeNumber)

  //Convert date into UTC format 
  const dateString = new Date(timeString).toUTCString();
  console.log(dateString)



  //Logic using if else if statement for Validation  
  //isNaN accepts Number and .length accepts String
  if(!isNaN(timeNumber) && timeString.length === 13) {
    return res.json({
      unix: timeNumber,
      utc: new Date(timeNumber).toUTCString() //Date() accepts Number
  });
} 

  //Check if incoming parameter is valid or not
  else if(dateString != "Invalid Date") {
  return res.json({
    unix: new Date(timeString).getTime(), 
    utc: new Date(timeString).toUTCString()
  });
}

else {
  console.log(new Date(timeNumber).toUTCString())
  res.send({error : "Invalid timestamp format used. For unix enter 13 Digits & for date enter YYYY-MM-DD."})
}

});






//Giving Port Access:
//Listen for requests - PORT specified in .env shell file
const listener = app.listen(process.env.PORT, function () {
  console.log('Node app is listening at http://localhost:' + listener.address().port );
});






//Notes:
//CORS:
// Allows us to make requests from one website to another website in the browser, 
// which is normally prohibited by another browser policy called the Same-Origin Policy (SOP).