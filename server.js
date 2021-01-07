const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3456;

var app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    
    useUnifiedTopology: true,
useFindAndModify: false,
    
    useNewUrlParser: true
});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
    console.log("App running on "+PORT+"!" )
});