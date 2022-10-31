//To load .env file we must load dotenv package
const dotenv = require('dotenv');

//To use it we must call configure()
dotenv.config();


// index.js
// where your node app starts


// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Route 1: Our 1st API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//Route 2: After api endpoint - If there is Empty Parameter then return with response:
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
  res.send({error : "Invalid Unix Timestamp - Enter 13 Digits. Invalid Timstamp - Enter date in YYYY-MM-DD format."})
}

});




// listen for requests - PORT specified in .env shell file
const listener = app.listen(process.env.PORT, function () {
  console.log('Node app is listening at http://localhost:' + listener.address().port );
});
