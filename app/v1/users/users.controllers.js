
const userService = require('./users.service');

exports.create = async (req, res) => {
try{
    const {error, data} = await userService.create(req.body);
    if(error)
    {
        return res.status(400).json({error})
    }
    return res.status(201).json({data});
}catch(e) {
    return res.status(500).json({error: e.message});
}
}

exports.read = async (req,res) => {
    const {user_id} = req.params;
    if(!user_id) return res.status(422).json({error: "invalid name"})
    const {error, data, code} = await userService.read(user_id);
    if(error)
    {
        return res.status(code || 400).json({error})
    }
    return res.status(200).json({data});
}

exports.update = async (req,res) => {
    const {user_id} = req.params;
    const payload = req.body;
    if(!user_id) return res.status(422).json({error: "invalid user_id"})
    // if(!age && !state) return  res.status(422).json({error: "invalid age and state"})

    const {error, data} = await userService.update(user_id,payload);
    if(error)
    {
        return res.status(400).json({error})
    }
    return res.status(200).json({data});
}
exports.delete = async (req,res) => {
    const {user_id} = req.params;
    if(!user_id) return res.status(422).json({error: "invalid user_id"})

    const {error, data} = await userService.delete(user_id);
    if(error)
    {
        return res.status(400).json({error})
    }
    return res.status(204).send();
}

