const User = require("../model/userModel");
const bcrypt = require ("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        const userExists = await User.findOne({username});
        if (userExists){
            return res.json({msg:"Username is taken", status:false});
        }
        const emailExists = await User.findOne({email});
        if (emailExists){
            return res.json({msg:"Email is taken", status:false});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        const id = user._id;
        const token = jwt.sign({username:user.username, _id:user._id}, process.env.JWT_KEY, {
            expiresIn:300,
        });
        res.cookie("token", token);
        delete user.password;
        return res.json({status: true, user});
    }catch(ex){
        next(ex);
    }
}

module.exports.login = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user){
            return res.json({msg:"Invalid username/password", status:false});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            return res.json({msg:"Invalid username/password", status:false});
        }
        const id = user._id;
        const token = jwt.sign({username:user.username, _id:user._id}, process.env.JWT_KEY, {
            expiresIn:300,
            
        });
        res.cookie("token", token, {
            httpOnly:true,
        });
        delete user.password;
        return res.json({status:true, username:user.username,_id:user._id});
    }catch(ex) {
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "_id",
        ]);
        users.sort((a,b) => a.username.localeCompare(b.username));
        return res.json(users);
    }catch(ex) {
        next(ex);
    }
};