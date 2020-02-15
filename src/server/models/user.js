const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./review');
/** Class representing a point. */

mongoose.connect('mongodb://127.0.0.1:27017/rest-rate-api',{
    useNewUrlParser:true,
    useCreateIndex:true
});

const userSchema = new mongoose.Schema(
    {
        login_name:{},
        age:{},
        password:{},
        avatar:{type:Buffer},
        tokens:[{
            token:{
                type:String,
                require: true
            }
        }]
    },{
        timestamps:true
    }
);

userSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id', // the relation field between task and user
    foreignField:'owner'
});

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'alexlavriv');
    user.tokens = user.tokens.concat({token});
        await user.save();
    return token
};

userSchema.methods.toJSON = function(){
    console.log("getPublicProfile");
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};

userSchema.statics.findByCredentials = async  (login_name, password) =>{
    console.log("in model")
    const user = await User.findOne({login_name});

    if (!user){
        throw new Error("Unable to log in")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error ("Unable to log in")
    }

    return user;

};
/** This is a description of the foo function. */
userSchema.pre('save', async function (next){
    const user = this;
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    console.log("just before saving ", user);
    next();
})

/** This is a description of the foo function. */
userSchema.pre('remove', async function (next){
    const user = this;
     await Task.deleteMany({owner:user._id})

    console.log("just before removing ", user);
    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User