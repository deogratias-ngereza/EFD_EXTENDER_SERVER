const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var CONFIG = require('./config.json');
const PORT = CONFIG.port;

//app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
//app.use(bodyParser.json())




/*
	 RECEIVED RAW FILE FROM php 
*/
app.post('/efd_raw',function(req,res){

    console.log("DATA RECEIVED: " + JSON.stringify(req.body));
    
    //save to a file --dpool/in -- efd prnt
    var path = CONFIG.efp_path;
	fs.writeFile(path + "/" + req.body.file_name , req.body.file_data, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("\nThe file was saved!\n");
	}); 
    res.send('OK');
});







app.get('/', (req, res) => res.send('EFD LISTENER'));

app.get('/efd',function(req,res){


    console.log("DATA RECEIVED: " + req);
    res.send('OK');


});




// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  	console.log("[ SIGINT ] TODO: SOMETHING BROKE!! Please save to the log file!!!");
}); 
process.on('uncaughtException', function(error) {
      console.log("[ UNKNOWN_ERROR ] TODO: SOMETHING BROKE!! Please save to the log file!!!");
      console.log(error);
      //process.exit(1)
});











//listening to devices
app.post('/',function(req,res){
    console.log("DATA RECEIVED: " + req);
    res.send('OK');
});


app.listen(PORT, () => console.log('Example app listening on port ' + PORT));