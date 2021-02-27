import { Package, validate, validateUpdate } from "../Validators/package.mjs";
export const get_packages = async (req, res) => {
  const packages = await Package.find().sort("first_name");
  res.send(pacakges);
};

export const get_package = async (req, res) => {
  const _package = await Package.findById(req.params.id);
  if (!_package) return res.status(400).send("No package with given id.");
  res.send(_pacakge);
};

export const post_package = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let _package = new Package(req.body.data);
  _package = await _package.save();

  res.send(_package);
};

export const update_package = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const _package = await Package.findByIdAndUpdate(
    req.params.id,
    req.body.data,
    {
      new: true,
    }
  );

  if (!_package)
    return res
      .status(404)
      .send("The Package with the given id is not available");

  res.send(_package);
};
