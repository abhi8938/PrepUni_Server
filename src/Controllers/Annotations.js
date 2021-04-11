const {
  Annotations,
  Validate,
  ValidateUpdate,
}=require("../Validators/annotations");

const get_annotations = async (req, res) => {
  const annotations = await Annotations.find({STID:req.user._id}).sort("pageCfi");
  res.send(annotations);
};

const get_annotation = async (req, res) => {
  const annotation = await Annotations.find({STID:req.user._id,paper_id:req.params.id}).sort("pageCfi");
  if (!annotation) throw new Error("Invald Id");
  res.status(200).send(annotation);
};

const post_annotations = async (req, res) => {
  req.body.STID=req.user._id
  const { error } = Validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const duplicate = await Annotations.findOne({
    paper_id: req.body.paper_id,
    STID: req.user._id,
  });
  if (duplicate)
    throw new Error(
      "Data is aldredy uplaoded under this paper try  editing it"
    );

  let annotations = new Annotations(req.body);

  annotations = await annotations.save();

  res.status(200).send(annotations);
};

const update_annotations = async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const annotations=await Annotation.findOneAndUpdate(
    {
      STID:req.user._id,
      _id:req.params.id
    },
    req.body,
    {new:true}
  )

  // const annotations = await Annotations.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   { new: true }
  // );

  if (!annotations)
    throw new Error("The annotations with the given id is not available");

  res.status(200).send(annotations);
};

module.exports={
  get_annotations,
  update_annotations,
  post_annotations,
  get_annotation
}