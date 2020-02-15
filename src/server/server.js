const express = require('express');
const userRouter = require('./routers/user');
const reviewRouter = require('./routers/review');
const port = process.env.PORT || 8000;

const app = express();



app.use(function(req, res, next) {

    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(userRouter);
app.use(reviewRouter);




app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
});