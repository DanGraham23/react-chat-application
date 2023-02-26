const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try{
        const {from, to, message} = req.body;
        const data = await messageModel.create({
            message: {text:message},
            users: [from,to],
            sender: from,
        });
        if (data) {
            return res.json({msg : " Message added successfully"});
        }
        return res.json({msg: " Failed to add message !!"});

    }catch(ex){
        next(ex);
    }
}

module.exports.getMessage = async (req, res, next) => {
    try{
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from,to],
            },
        }).sort({updatedAt:1});
        const projectMessages = messages.map((curMsg) => {
            return {
                fromSelf: curMsg.sender.toString() === from,
                message: curMsg.message.text,
            }
        });
        res.json(projectMessages);
    }catch(ex){
        next(ex);
    }
}