import {
  Subscription,
  validate,
  validateUpdate,
} from "../Validators/subscription.mjs";

import { Pack } from "../Validators/package.mjs";
import { Paper_Product } from "../Validators/paper_product.mjs";
import { Student } from "../Validators/student.mjs";

export const get_subscriptions = async (req, res) => {
  const subscriptions = await Subscription.find().sort("type");
  res.send(subscriptions);
};

export const get_subscription = async (req, res) => {
  const subscription = await Subscription.findOne({ STID: req.user._id });
  if (!subscription)
    return res.status(400).send("No Subscription found with given id");
  res.send(subscription);
};

export const post_subscription = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findById(req.user._id);
  if (!student) return res.status(404).send("No Student found with given id");

  const pack = await Pack.findById(req.body.PID);
  if (!pack) return res.status(404).send("No Package found with given id");

  const paper_products = await Paper_Product.find({
    university: student.university,
    course: student.course,
    semester: student.semester,
  });
  if (paper_products.length === 0)
    return res
      .status(404)
      .send("No Papers found for the following student data");

  const PPIDS = [];
  let subInstance = {
    STID: student._id,
    PID: pack._id,
    type: pack.type,
    expiration: "321312321", // calculate time
  };
  subInstance.status = pack.type === "TRIAL" ? "ACTIVE" : "INACTIVE";
  paper_products.map((item) => PPIDS.push(item._id));
  subInstance.PPIDS = PPIDS;

  let subscription = new Subscription(subInstance);
  subscription = await subscription.save();
  if (subscription.type === "TRIAL") {
    return res
      .status(201)
      .send(`Your Trial package is active till ${subscription.expiration}`);
  } else if (subscription.type === "PAID") {
    return res.status(201).send(`http://127.0. 0.1:3001/ccavRequestHandler`);
  }

  res.send(subscription);
};

export const update_subscription = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!subscription)
    return res
      .status(404)
      .send("The subscription with the given id is not available");

  res.send(subscription);
};
