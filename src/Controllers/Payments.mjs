import { Payment, validate } from "../Validators/payments.mjs";

export const get_payment = async (req, res) => {
  //TODO: Complete Request
  const payments = await Payment.find().sort("name");
  res.send(payments);
};

export const post_payment = async (req, res) => {
  //TODO: Complete Request
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  debug("payment response - ", req);
  let payments = new Payment({
    STID: req.body.STID,
    transactionID: req.body.transactionID,
    amount: req.body.amount,
    SID: req.body.SID,
    type: req.body.type,
    createdAt: req.body.createdAt, //TODO: generate timestamp
  });

  payments = await Payments.save();

  res.send(payments);
};

export const update_payment = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!payment)
    return res
      .status(404)
      .send("The Payment with the given id is not available");

  res.send(payment);
};

export const cancel_payment = async (req, res) => {
  res.send("done");
};
