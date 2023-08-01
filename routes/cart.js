const express = require("express");
const route = express.Router();
const Cart = require("../models/cart");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const Joi = require("joi");

route.post("/addToCart", auth, async (req, res) => {
  const { _id } = req.user;
  const { itemId, quantity, price } = req.body; // Include the price of the item

  // Find the user's cart based on the user ID
  const cart = await Cart.findOne({ _id });

  if (!cart) {
    const newCart = new Cart({
      _id,
      items: [{ itemId, quantity, price }], // Store the price of the item
    });
    await newCart.save();
  } else {
    cart.items.push({ itemId, quantity, price }); // Store the price of the item
    await cart.save();
  }

  res.send("Item added to cart successfully");
});

route.get("/cartTotal", auth, async (req, res) => {
  const { _id } = req.user;

  const cart = await Cart.findOne({ _id });
  if (!cart) {
    return res.status(404).send("Cart not found");
  }

  let cartTotal = 0;
  cart.items.forEach((item) => {
    cartTotal += item.price * item.quantity;
  });

  res.send({ cartTotal });
});
