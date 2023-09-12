const { default: mongoose } = require("mongoose");
const Users = require("./person.model");

exports.create = async ({ name}) => {
  try {
    const isExist = await Users.findOne({name});
    console.log({isExist})
    if(isExist) return {error: "name already exists"};
    const response = new Users({ name});
    console.log({ response });
    const da = await response.save();
    console.log({ da });
    const person = {id: response.id, name: response.name}
    if (response) return { data: person };
  } catch (e) {
    if (e.message.includes("duplicate")) {
      return { error: "duplicate person with name", code: 422 };
    }
    return { error: "Creation failed", code: 500};
  }
};
exports.read = async (keyword) => {
  try {
    let query ;
if(mongoose.isValidObjectId(keyword)){
  const response = await Users.findById(keyword);
  if(!response) return {error: "User not found", code: 404};
  const{id, name} = response;
  return {data: {id, name}, code: 200}
}
    const regex = new RegExp(keyword, 'i');
    const response = await Users.find({
        $or:[
            {$text : {$search: regex}},
        ]
       });
    if (!response) return { error: "not found", code: 404 };
    const{id, name} = response[0];
    return { data: {id, name}, code: 200 };
  } catch (e) {
    if (e.message.includes("Cast to ObjectId")) {
        console.log(e.message)
      return { error: "invalid person id " + keyword, code: 422 };
    }
    return { error: "internal server error" };
  }
};

exports.update = async (id, payload) => {
  try {
    const response = await Users.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return { data: response };
  } catch (e) {
    if (e.message.includes("Cast to ObjectId")) {
        return { error: "invalid person id " + id, code: 422 };
      }
    return { error: "update failed" };
  }
};

exports.delete = async (id) => {
  try {
    const response = await Users.findOneAndDelete({ _id: id });
    if (response) return { data: "Person deleted" };
    return { error: "failed" };
  } catch (e) {
    if (e.message.includes("Cast to ObjectId")) {
        return { error: "invalid user id " + id, code: 422 };
      }
    return { error: "delete failed" };
  }
};
