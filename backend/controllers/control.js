let Orders2 = require("../models/model");
const express = require("express");

const getOrders = async (req, res) => {
  try {
    const post = await Orders2.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

/*const postOrders = (req, res) => {
  const orderName = req.body.name;
  const newOrder = new Orders2({ orderName });

  newOrder
    .save()
    .then(() => res.json("Order has been added "))
    .catch((err) => res.status(400).json("Errors" + err));
}; */

const postOrders = async (req, res) => {
  /*const orderName = req.body.name;
  const newOrder = new Orders2({ orderName });

  newOrder
    .create(req.body)
    .then((name) => res.json({ msg: "Order added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this order" })
    ); */
  if (!req.body) {
    res.status(400);
    res.status(200).json("Please add you order");
  }

  /*const ord = await Orders2.create({
    text: req.body,
  });
  res.status(200).json(ord); */
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const order3 = new Orders2({
    name,
    quantity,
    price,
  });

  order3
    .save()
    .then(() => res.json("Order has been added "))
    .catch((err) => res.status(400).json("Errors" + err));
};

/*const updateOrders = (req, res) => {
  res.status(200).json({ message: "Update order" });
}; */
const deleteOrders = async (req, res) => {
  const post = await Orders2.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Order not found" });
  }

  await post.remove();

  res.json({ msg: "Order removed" });
};

const updateOrders = (req, res) => {
  try {
    Shipment.updateOne(
      { Shipment_status: "ReadyToShip" },
      { $set: { Order_status: "Shipped" } },
      { upsert: true }
    );
  } catch (e) {
    res.status(200).json("Error");
  }
  try {
    Shipment.updateOne(
      { Shipment_status: "Shipped" },
      { $set: { Order_status: "Delivered" } },
      { upsert: true }
    );
  } catch (e) {
    print(e);
  }
  try {
    Shipment.updateOne(
      { Shipment_status: "Canceled" },
      { $set: { Order_status: "Returned" } },
      { upsert: true }
    );
  } catch (e) {
    print(e);
  }
  try {
    Shipment.updateOne(
      { Order_Id: req.body.Order_Id },
      { $set: { Order_status: "Created" } },
      { upsert: true }
    );
  } catch (e) {
    print(e);
  }
};

module.exports = {
  getOrders,
  postOrders,
  updateOrders,
  deleteOrders,
};
