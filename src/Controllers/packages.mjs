import { Package, validate } from "../Validators/package.mjs";
export const get_packages = async (req, res) => {
  //TODO: Complete Request
  const packages = await Package.find().sort("first_name");
  res.send(pacakges);
};

export const post_package = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let _package = new Package({
    type: req.body.type,
  });

  _package = await _package.save();

  res.send(_package);
};

export const update_package = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const _package = await Package.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
    },
    { new: true }
  );

  if (!_package)
    return res
      .status(404)
      .send("The Package with the given id is not available");

  res.send(_package);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
