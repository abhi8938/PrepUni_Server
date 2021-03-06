const { Pack, validate, validateUpdate } = require("../Validators/package");
const { Referals } = require("../Validators/referals");

const get_packages = async (req, res) => {
  let packs = await Pack.find().sort("life");
  let referal = await Referals.findOne({ STID: req.user._id });

  if (referal) {
    packs.map((item, index) => {
      if (item.type === "PAID") {
        packs[index] = {
          ...JSON.parse(JSON.stringify(item)),
          discount: referal.balance,
        };
      }
    });
  }
  return res.status(200).send(packs);
};

const get_package = async (req, res) => {
  const pack = await Pack.findById(req.params.id);
  if (!pack) throw new Error("No package with given id.");
  res.status(200).send(pack);
};

const post_package = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);
  let pack = new Pack(req.body);
  pack = await pack.save();
  res.status(200).send(pack);
};

const update_package = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const pack = await Pack.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!pack) throw new Error("The Package with the given id is not available");

  res.status(200).send(pack);
};

module.exports = {
  update_package,
  post_package,
  get_package,
  get_packages,
};
