const {model}= require("mongoose");
const {UserSchema}= require("../schema/UserSchema.js");

const user= new model("user", UserSchema);

module.exports= {user};