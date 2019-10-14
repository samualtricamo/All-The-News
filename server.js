var express = require("express");
var mongoose = require("mongoose"); //Mongo object modelling 
var expressHandlebars = require("express-handlebars");
var cheerio = require("cheerio"); //Scraper
var bodyParser = require("body-parser"); //JSON responses

var PORT = process.env.PORT || 8080;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", expressHandlebars({ 
	defaultLayout: "main" 
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
	 extended: false 
}));


app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(eror) {

	if (error) {
		console.log(error);
	}
	else {
		console.log("mongoose connection successful");
	}
});


// Start the server
app.listen(PORT, function () {
    console.log("This application is running on port:" + PORT);
});