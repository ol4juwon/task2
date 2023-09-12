'use strict';

const mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const schema = mongoose.Schema({
    name: {type: String, required: true, index: true},



}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

schema.post('save', function(user) {
    console.log("POST save", user);

});

schema.index({"$**": "text", _id: "text"});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("person", schema);