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
  if (!annotation) throw new Error("Invald Id");
};

export const post_annotations = async (req, res) => {
  const { error } = Validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let annotations = new annotations(req.body);

  annotations = await annotations.save();

  res.send(annotations);
};

export const update_annotations = async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const annotations = await Annotations.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!annotations) throw new Error("The annotations with the given id is not available");

  res.send(annotations);
};
