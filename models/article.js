var mongoose = require("mongoose");
var schema = mongoose.schema;

var articleschema = new schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        default: "Summary Not Available",
    },
    issaved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Save Article"
    },
    created: {
        type: Date,
        default: Date.now
    },
    node: {
        type: schema.Types.ObjectId,
        ref: "Note"
    }
});

articleschema.index({title: "text"});

var Article = mongoose.model("Article", articleschema);
module.exports = Article;