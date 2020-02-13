const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async(req,res , next)=>{
    try {
        console.log("middlware", req.body);
        const token = req.body.token;
        console.log(token);
        const decode = jwt.verify(token, 'alexlavriv');
        const user = await User.findOne({_id: decode._id, 'tokens.token':token});
        if (!user){
            throw new Error()
        }
        res.user = user;
        req.token = token;
        console.log(token);
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({error: 'Please authenticate.'})
    }
 
};

module.exports = auth;