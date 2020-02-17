const express = require('express');
const router =new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

router.get('/test', (req,res)=>{
    res.send('From a new file')
});
const upload = multer();

router.get("/users/:username", async (req, res) => {
    console.log("in available, username:", req.params.username);
    User.findOne({login_name: req.params.username}, async (err, foundUsername) => {
        if (err) {
            res.status(400).send();
        } else if (!foundUsername) {
            res.send({'available': true});
        } else {
            res.send({'available': false});
        }
    });
});

router.post('/users/register',upload.single('avatar'), async (req, res) => {
    console.log("REGISTER");
    const {file} = req;
    const user = new User(req.body);
    user.avatar = file.buffer;
    console.log(req);
    try
    {
        const saved_user = await user.save();
        const token = await user.generateAuthToken();
      
        res.send({'user':saved_user, token})
    } catch(e){
        res.send(e)
    }
});


router.get("/users/me", auth, async (req, res)=>{
    console.log("in me");
    res.send(res.user)
});



router.post('/users/login', async (req,res)=>{
    try{
        console.log("in login, body:", req.body);
        const user = await User.findByCredentials(req.body.login_name, req.body.password);
        if (user){
            const token = await user.generateAuthToken();
            res.send({user, token});
        } else {
            res.status(400).send();
        }
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth,async (req,res)=>{
    try{
        res.user.tokens = res.user.tokens.filter((token) =>{ return token.token !== req.token });
        await res.user.save();
        console.log("before sending ok");
        res.status(200).send({})
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth,async (req,res)=>{
    try{
        res.user.tokens = [];
        await res.user.save();
        console.log("before sendig ok");
        res.status(200).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body);
    try {
        console.log("Updating user");
        const user = res.user;
        
        updates.forEach(update_key =>{
            user[update_key] = req.body[update_key]
        });
        await user.save();

        //const user = await User.findByIdAndUpdate(req.params.id, {name:req.body})
        console.log("Done updating")
        res.send(user)
    } catch (error) {
        res.send('error')
    }
});

router.delete('/users/me', auth, async(req,res) =>{
    try {
        //const user = await User.findByIdAndDelete(res.user._id)
        
        await res.user.remove()
        sendCancelEmail(res.user.email, res.user.name)
        res.send(res.user);
    } catch (error) {
        res.send(error)
    }
})


avatar = multer({
    limits:{
        fileSize: Math.pow(2,20)
    },
    fileFilter(req,file, cb){
        
        if(!file.originalname.match(/\.jpe?g|png$/))
           {return cb(new Error('File must be a jpe?g or png'))}
           cb(undefined, true);
    }
})
const errorMiddleware = (req,res,next)=>{
    throw new Error('From my middleware')
}
router.post('/users/me/avatar', auth ,avatar.single('avatar'), async (req,res) =>{
    const buffer =await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    res.user.avatar = buffer
    await res.user.save()
    res.send()
}, (error, req,res, next)=>{
    res.status(400).send({message:"fucking fuck"})
})

router.delete('/users/me/avatar', auth, async (req,res) =>{
    res.user.avatar = undefined
    await res.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})


module.exports = router;