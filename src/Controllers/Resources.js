const {
  Resources,
  Validate,
  ValidateUpdate,
} =require("../Validators/resources");

const get_resource = async (req, res) => {
  const resources = await Resources.find({
    STID: req.user._id,
  });
  res.status(200).send(resources);
};

const post_resource = async (req, res) => {
  const { error } = Validate(req.body);
  if (error) throw new Error(error.details[0].message);

  req.body.STID=req.user._id

  let resources = new Resources(req.body);

  resources = await resources.save();

  res.status(200).send(resources);
};

const update_resource = async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const resources = await Resources.findOneAndUpdate(
    {
      STID:req.user._id,
      _id:req.params.id
    },
    req.body, {
    new: true,
  });

  if (!resources)
  throw new Error("The resources with the given id is not available");

  res.status(200).send(resources);
};

// export const delete_student = (req, res) => {
//TODO Request
// };

module.exports={
  update_resource,
  post_resource,
  get_resource
}