import { Payment, validate } from "../Validators/payments.mjs";

import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_test_JrmprfPdb6LHFI",
  key_secret: "Ut6lmneQIQXOufkeflo4jHFC",
});

export const get_payment = async (req, res) => {
  //TODO: Complete Request
  const payments = await Payment.find().sort("name");
  res.send(payments);
};

export const post_payment = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var options = {
    amount: 5000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    // debug("payment response - ", req);
    let payment = new Payment({
      STID: req.body.STID,
      order_id: order.id,
      amount: req.body.amount,
      SID: req.body.SID,
      type: req.body.type,
      // createdAt: req.body.createdAt, //TODO: generate timestamp
    });
    payment = await payment.save();
    res.send(payment);
  } catch (e) {
    throw new Error(e);
  }
};

export const update_payment = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!payment)
    throw new Error("The Payment with the given id is not available");

  res.send(payment);
};

export const cancel_payment = async (req, res) => {
  res.send("done");
};
