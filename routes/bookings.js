const express = require("express");
const route = express.Router();
const {
  HomeInteriors,
  validateHomeInteriors,
} = require("../models/homeInteriors");
const { Users } = require("../models/users");
const mongoose = require("mongoose");

// Get all home interiors
route.get("/", async (req, res) => {
  try {
    const homeInteriors = await HomeInteriors.find().sort({ _id: -1 });
    res.send(homeInteriors);
  } catch (error) {
    console.error("Error retrieving home interiors:", error);
    res.status(500).send("An error occurred while retrieving home interiors");
  }
});

// Create a new home interior
route.post("/", async (req, res) => {
  const { error } = validateHomeInteriors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Users.findOne({ email: req.body.email });

  const homeInterior = new HomeInteriors({
    user: {
      _id: user ? user._id : new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
    },
    interiorName: req.body.interiorName,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    await homeInterior.save();
    res.send(homeInterior);
  } catch (error) {
    console.error("Error saving home interior:", error);
    res.status(500).send("An error occurred while saving the home interior");
  }
});

// Get a specific home interior by ID
route.get("/:id", async (req, res) => {
  try {
    const homeInterior = await HomeInteriors.findById(req.params.id);
    if (!homeInterior)
      return res.status(404).send("This home interior does not exist");
    res.send(homeInterior);
  } catch (error) {
    console.error("Error retrieving home interior:", error);
    res
      .status(500)
      .send("An error occurred while retrieving the home interior");
  }
});

// Update a home interior
route.put("/:id", async (req, res) => {
  try {
    const homeInterior = await HomeInteriors.findByIdAndUpdate(
      req.params.id,
      {
        interiorName: req.body.interiorName,
        description: req.body.description,
        price: req.body.price,
      },
      { new: true }
    );
    if (!homeInterior)
      return res.status(404).send("This home interior does not exist");
    res.send(homeInterior);
  } catch (error) {
    console.error("Error updating home interior:", error);
    res.status(500).send("An error occurred while updating the home interior");
  }
});

// Delete a home interior
route.delete("/:id", async (req, res) => {
  try {
    const homeInterior = await HomeInteriors.findByIdAndRemove(req.params.id);
    if (!homeInterior)
      return res.status(404).send("This home interior does not exist");
    res.send(homeInterior);
  } catch (error) {
    console.error("Error deleting home interior:", error);
    res.status(500).send("An error occurred while deleting the home interior");
  }
});

module.exports = route;
