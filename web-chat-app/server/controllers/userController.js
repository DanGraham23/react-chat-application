const User = require("../model/userModel");
const bcrypt = require ("bcrypt");

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
        delete user.password;
        return res.json({status:true, user});
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
        return res.json(users);
    }catch(ex) {
        next(ex);
    }
}