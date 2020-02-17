const express = require('express');
const userRouter = require('./routers/user');
const reviewRouter = require('./routers/review');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const app = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(userRouter);
app.use(reviewRouter);




app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
});