const {model}= require("mongoose");
const {PositionSchema}= require("../schema/PositionSchema");

const position= new model("position", PositionSchema);

module.exports= {position};