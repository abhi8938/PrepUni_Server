import { Study_Material, validate } from "../Validators/study_material";

export const get_study_material = async (req, res) => {
  //TODO: Complete Request
  const study_material = await Study_Material.find().sort("first_name");
  res.send(study_material);
};

export const post_study_material = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let study_material = new Study_Material({
    name: req.body.name,
  });

  study_material = await study_material.save();

  res.send(study_material);
};

export const update_study_material = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const study_material = await Study_Material.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!study_material)
    return res
      .status(404)
      .send("The study_material with the given id is not available");

  res.send(study_material);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
