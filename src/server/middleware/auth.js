const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async(req,res , next)=>{
    try {
        console.log("middlware");
        const token = req.header('Authorization').replace('Bearer ','');
        console.log(token);
        const decode = jwt.verify(token, process.env.JWT_SECRET);
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