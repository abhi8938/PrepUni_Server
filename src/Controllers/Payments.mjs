import { Payment, validate, validateUpdate } from "../Validators/payments.mjs";
import {routes} from "../Configs/routes.mjs"
import Razorpay from "razorpay";
import crypto from "crypto";
import https from 'https';
// import { chunk } from "lodash";

var instance = new Razorpay({
  key_id: "rzp_test_JrmprfPdb6LHFI",
  key_secret: "Ut6lmneQIQXOufkeflo4jHFC",
});

export const get_payment = async (req, res) => {
  const payments = await Payment.find().sort("name");
  res.status(200).send(payments);
};

export const post_payment = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  var options = {
    amount: 5000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    let payment = new Payment({
      STID: req.body.STID,
      order_id: order.id,
      amount: req.body.amount,
      SID: req.body.SID,
      type: req.body.type,
    });
    payment = await payment.save();
    res.status(200).send(payment);
  } catch (e) {
    throw new Error(e);
  }
};

export const update_payment = async (req, res) => {
  //TODO: Complete Request
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!payment)
  throw new Error("The Payment with the given id is not available");

  const order_id = payment.order_id;
  const razorpay_signature = payment.razorpay_signature
  const razorpay_payment_id=payment.razorpay_payment_id

  const hmac = crypto.createHmac('sha256', "Ut6lmneQIQXOufkeflo4jHFC");

hmac.update(order_id + "|" + razorpay_payment_id);
let generatedSignature = hmac.digest('hex');

let isSignatureValid = generatedSignature === razorpay_signature;

 if(!isSignatureValid) throw new Error('Invalid Razorpay Payment Signature')

 payment.status="SUCCESS"
 await payment.save()
  

  res.status(200).send(payment);
};

export const cancel_payment = async (req, res) => {
  res.status(200).send("done");
};
