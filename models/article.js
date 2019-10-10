var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    note: {
        type: schema.Types.ObjectId,
        ref: "Note"
    }
});

articleschema.index({title: "text"});

var Article = mongoose.model("Article", Articleschema);
module.exports = Article;