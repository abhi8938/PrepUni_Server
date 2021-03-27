import {
  Resources,
  Validate,
  ValidateUpdate,
} from "../Validators/resources.mjs";

export const get_resource = async (req, res) => {
  const resources = await Resources.find({
    STID: req.user._id,
  });
  res.status(200).send(resources);
};

export const post_resource = async (req, res) => {
  const { error } = Validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let resources = new Resources(req.body);

  resources = await resources.save();

  res.status(200).send(resources);
};

export const update_resource = async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const resources = await Resources.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!resources)
  throw new Error("The resources with the given id is not available");

  res.status(200).send(resources);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
