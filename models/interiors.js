const mongoose = require("mongoose");
const Joi = require("joi");

const homeInteriorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const HomeInterior = mongoose.model("HomeInterior", homeInteriorSchema);

function validateHomeInterior(homeInterior) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(10).max(1000).required(),
    price: Joi.number().min(0).required(),
    imageUrl: Joi.string().required(),
  });

  return schema.validate(homeInterior);
}

module.exports.HomeInterior = HomeInterior;
module.exports.validateHomeInterior = validateHomeInterior;
