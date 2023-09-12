const Users = require("./users.model");

exports.create = async ({ name}) => {
  try {
    const isExist = await Users.findOne({name});
    console.log({isExist})
    if(isExist) return {error: "name already exists"};
    const response = new Users({ name});
    console.log({ response });
    const da = await response.save();
    console.log({ da });
    if (response) return { data: response };
  } catch (e) {
    if (e.message.includes("duplicate")) {
      return { error: "duplicate user with email exists", code: 422 };
    }
    return { error: "Creation failed", code: 500};
  }
};
exports.read = async (id) => {
  try {

    const regex = new RegExp(id, 'i');
    const response = await Users.find({
        $or:[
            {$text : {$search: regex}},
            {_id: id }

        ]
       });
    if (!response) return { error: "not found", code: 404 };
    return { data: response[0], code: 200 };
  } catch (e) {
    if (e.message.includes("Cast to ObjectId")) {
        console.log(e.message)
      return { error: "invalid user id " + id, code: 422 };
    }
    return { error: e.message };
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
        return { error: "invalid user id " + id, code: 422 };
      }
    return { error: e.message };
  }
};

exports.delete = async (id) => {
  try {
    const response = await Users.findOneAndDelete({ _id: id });
    if (response) return { data: "ok" };
    return { error: "failed" };
  } catch (e) {
    if (e.message.includes("Cast to ObjectId")) {
        return { error: "invalid user id " + id, code: 422 };
      }
    return { error: e.message };
  }
};
