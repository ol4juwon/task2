'use strict';

const mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const schema = mongoose.Schema({
    name: {type: String, required: true, index: true},
    username: {type: String, required: true, unique: true},
    email: {type: String , index: true, unique: true, required: true},
    age: {type: String, index: true, required: true},
    track: {type: String, index: true, required: true},


}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true
});

schema.post('save', function(user) {
    console.log("POST save", user);

});

schema.index({"$**": "text"});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("users", schema);