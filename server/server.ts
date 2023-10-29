import userApi from "./user-api";
import express from 'express';

var app = express();

app.use("/rooms", userApi),

app.use("/", userApi);

// app.get('/', function(req, res) {
//     res.send('Hello World');
// })

app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})