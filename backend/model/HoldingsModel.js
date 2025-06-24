const {model}= require("mongoose");
const {HoldingsSchema}= require("../schema/HoldingsSchema.js")

const holding= new model("holding", HoldingsSchema);

module.exports= {holding};