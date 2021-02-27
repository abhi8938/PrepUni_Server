import { Pack, validate, validateUpdate } from "../Validators/package.mjs";

export const get_packages = async (req, res) => {
  const packs = await Pack.find().sort("life");

  return res.send(packs);
};

export const get_package = async (req, res) => {
  const pack = await Pack.findById(req.params.id);
  if (!pack) return res.status(400).send("No package with given id.");
  res.send(pack);
};

export const post_package = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let pack = new Pack(req.body);
  pack = await pack.save();
  res.send(pack);
};

export const update_package = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const pack = await Pack.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!pack)
    return res
      .status(404)
      .send("The Package with the given id is not available");

  res.send(pack);
};
