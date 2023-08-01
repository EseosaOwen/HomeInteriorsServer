const express = require("express");
const router = express.Router();

const {
  HomeInterior,
  validateHomeInterior,
} = require("../models/homeInterior");

// Route handler for getting all home interiors
router.get("/", async (req, res) => {
  try {
    const homeInteriors = await HomeInterior.find();
    res.json(homeInteriors);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route handler for creating a new home interior
router.post("/", async (req, res) => {
  const { error } = validateHomeInterior(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const homeInterior = new HomeInterior(req.body);
    await homeInterior.save();
    res.status(201).json(homeInterior);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route handler for deleting a home interior
router.delete("/:id", async (req, res) => {
  try {
    const homeInterior = await HomeInterior.findByIdAndDelete(req.params.id);
    if (!homeInterior) {
      return res.status(404).json({ error: "Home interior not found" });
    }
    res.json({ message: "Home interior deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route handler for updating a home interior
router.put("/:id", async (req, res) => {
  const { error } = validateHomeInterior(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const homeInterior = await HomeInterior.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!homeInterior) {
      return res.status(404).json({ error: "Home interior not found" });
    }
    res.json(homeInterior);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
