import { Subscription, validate } from "../Validators/subscription.mjs";

export const get_subscriptions = async (req, res) => {
  //TODO: Complete Request
  const subscriptions = await Subscription.find().sort("name");
  res.send(subscriptions);
};

export const post_subscription = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subscriptions = new Subscription({
    PID: req.body.PID,
    STID:req.body.STID,
    PPID:req.body.PPID,
    Type:req.body.Type,
    PAID:req.body.PAID,
    status:req.body.status,

  });

  subscriptions = await subscriptions.save();

  res.send(subscriptions);
};

export const update_subscription = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!subscription)
    return res
      .status(404)
      .send("The subscription with the given id is not available");

  res.send(subscription);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
