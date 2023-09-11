const Users = require('./users.model');

exports.create = async ({name, email, username, age, track}) => {
    try{
        const response = new Users({name, email, username, age, track})
        console.log({response})
        const da = await response.save();
        console.log({da})
        if(response)
        return {data: response}
    }catch(e){
        return {error: e.message}
    }
}
exports.read = async (id) => {
    try{
        const response = await Users.findById(id);
        if(!response) return {error: "not found", code: 404}
        return {data: response, code: 200};
    }catch(e){
        return {error: e.message}
    }
}

exports.update = async ( id, payload) =>{
    try{
    const response = await Users.findOneAndUpdate({_id: id}, payload, {new: true});
    return {data: response};
    }catch(e){
        return {error: e.message}
    }
}

exports.delete = async (id) => {
    try{
    const response = await Users.findOneAndDelete({_id: id});
    console.log({response})
    if(response)
    return {data: "ok"};
return {error: "failed"}
    }catch(e){
        return {error: e.message};
    }
}