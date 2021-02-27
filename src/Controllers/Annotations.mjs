import {
  Annotations,
  Validate,
  ValidateUpdate,
} from "../Validators/annotations.mjs";

export const get_annotations = async (req, res) => {
  const annotations = await Annotations.find().sort("pageCfi");
  res.send(annotations);
};

export const get_annotation = async (req, res) => {
  const annotation = await Annotations.findById(req.user._id);
  if (!annotation) res.status(404).send("Invalid Id");
};

export const post_annotations = async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let annotations = new annotations(req.body);

  annotations = await annotations.save();

  res.send(annotations);
};

export const update_annotations = async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const annotations = await Annotations.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!annotations)
    return res
      .status(404)
      .send("The annotations with the given id is not available");

  res.send(annotations);
};
