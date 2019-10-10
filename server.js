var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");
var request = require("request");

var db = require("./models");

const PORT = process.env.PORT || 2000;

var app = express();

app.use(express.urlencoded({
	extended: true
  }));
  app.use(express.json());

  app.use(express.static("public"));

  var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.get('/scrape', function (req, res) {
  
	axios.get("https://stackoverflow.com/").then(function (response) {
  
		var $ = cheerio.load(response.data);
		var result = {};

		$("a.question-hyperlink").each(function (i, element) {

			result.title = $(this).text();
			result.link = $(this).attr("href");
	  
			db.Question.create(result)
        .then(function (dbQuestion) {
			console.log(dbQuestion);
        })
        .catch(function (err) {
          return res.json(err);
		});
		res.send("Hey!!! You were able to sucessfully scrape!!!");
    });
  });
});

app.get("/Questions", function (req, res) {
	db.Question.find({})
	  .then(function (dbQuestion) {
		res.json(dbQuestion);
	  })
	  .catch(function (err) {
		res.json(err);
	  });
  });
  
  app.get("/Questions/:id", function (req, res) {
	db.Question.findOne({
		_id: req.params.id
	  })
	  .populate("note")
	  .then(function (dbQuestion) {
		res.json(dbQuestion);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/Questions/:id", function (req, res) {
	
	db.Note.create(req.body)
	  .then(function (dbNote) {
		return db.Question.findOneAndUpdate({
			_id: req.params.id
		  }, {
			note: dbNote._id
		  }, {
			new: true
		  });
		})
		.then(function (dbQuestion) {
			res.json(dbQuestion);
		})
		.catch(function (err) {
		  res.json(err);
		});
	});
	app.listen(PORT, function () {
		console.log("App running on port " + PORT + "!");
	  });