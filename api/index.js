require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./mongo");
const { mongoClient } = require("./mongo");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/orders", async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("Systems Unavailable");

  const { search } = req.params;
  const results = await db
    .collection("orders")
    .find({ order_id: { $regex: search, $options: "i" } })
    .toArray();
  res
    .status(200)
    .send({ body: results, message: "Successfully retrieved search results" });
}); //check this ehhhh ???????????????????????????????

app.get("/api/orders/:order_id", async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("Systems Unavailable");
  let order_ids = parseInt(req.params.order_id);

  const shipment = await db
    .collection("orders")
    .findOne({ order_id: order_ids });
  res.status(200).send({ body: shipment, message: "Order retrived" });
}); //zbaty dyy

app.post("/api/orders", async (req, res) => {
  try {
    const db = await mongoClient();
    if (!db) res.status(500).json("Systems Unavailable");

    console.log("[createOrder body]", req.body);
    const { order_id } = req.body;
    if (!order_id) return res.status(403).json("order_id is required");

    const shipment = await db
      .collection("orders")
      .findOne({ order_id: order_id });
    if (shipment)
      return res.status(403).json("Document already exists, cannot create");

    const shipmentStatus = "CREATED";

    const newShipmentDocument = await db
      .collection("test.orders")
      .insertOne({ order_id, order_status: shipmentStatus });
    return res.status(200).json({
      body: newShipmentDocument,
      message: "Successfully created order",
    });
  } catch (e) {
    console.log("[createShipment] e", e);
  }
});

app.delete("/api/orders/:order_id", async (req, res) => {
  const db = await mongoClient();
  const post = await db
    .collection("orders")
    .findOne({ order_id: parseInt(req.params.order_id) });

  if (!post) {
    return res.status(404).json({ msg: "Order not found" });
  } else {
    db.collection("orders").remove({ order_id: parseInt(req.params.order_id) });

    res.json({ msg: "Order removed" });
  }
});

app.patch("/api/orders/:order_id", async (req, res) => {
  try {
    // const { order_id } = createShipment.order_id;
    const db = await mongoClient();
    const order_id = parseInt(req.params.order_id);

    const shipment = await db
      .collection("orders")
      .findOne({ order_id: order_id });
    if (!shipment) return res.status(200).json("could not find order_id");

    // fetch shipment from db for thiss order_id
    // determine what the current status is
    // determine what the next status should be
    // update the database with new

    const currentOrderStatus = shipment.order_status;
    const nextShipmentStatus = {
      CREATED: "PROCESSED",
      PROCESSED: "FULLFILLED",
      FULLFILLED: "FULLFILLED",
    }[currentOrderStatus];

    const updatedDocument = await db
      .collection("orders")
      .updateOne(
        { order_id: order_id },
        { $set: { order_status: nextShipmentStatus } }
      );
    res.status(200).json({
      body: shipment.order_status,
      message: "Successfully updated order status",
    });
  } catch (e) {
    console.log("[updateShipment] e", e);
  }
});

// app.delete('/api/shipments', async (req, res) => {
//   try {
//     console.log('[cancelShipment body]', req.body)
//     const { order_id } = req.body;
//     if (!order_id) return res.status(403).send('order_id is required');

//     const shipment = await ShipmentModel.findOne({ order_id: order_id });
//     if (!shipment) return res.status(403).send('Shipment does not exist');

//     if (shipment.shipment_status === 'CREATED') {
//       await ShipmentModel.updateOne({ order_id }, { shipment_status: 'CANCELED' });
//       return res.status(200).send({ body: 'CANCELED', message: 'Your Shipment has been canceled' });
//     }
//     return res.status(200).send({ body: shipment.shipment_status, message: 'Cannot cancel this shipments' });
//   }
//   catch (e) {
//     console.log('[cancelShipment] e', e)
//   }
// });

app.listen(process.env.PORT || 5000, async () => {
  console.log("The server is running on");
  await connect.mongoClient();
});
