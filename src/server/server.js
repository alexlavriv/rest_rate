const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(userRouter)



app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
}) 