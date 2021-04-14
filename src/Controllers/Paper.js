const { Paper, validate, validateUpdate } =require("../Validators/Paper");

const post_paper = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let paper = new Paper(req.body);

  paper = await paper.save();
  res.status(200).send(paper);
};

const get_papers = async (req, res) => {
  let papers;
  if (req.params.id) {
    papers = await Paper.find({ subject_id: req.params.id });
  } else {
    papers = await Paper.find().sort("name");
  }

  return res.status(200).send(papers);
};

const get_paper = async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  if (!paper) throw new Error("No papers based based on the Given ID");
  res.status(200).send(paper);
};

const update_paper = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!paper) throw new Error("There is no paper with given id");

  res.status(200).send(paper);
};

const download_file = (req, res) => {
  const fileName = req.params.name;
  res.download(`uploads/${fileName}`, (err) => {
    if (err) {
      throw new Error("File can not be downloaded: " + err);
    }
  });
};

module.exports={
  update_paper,
  get_paper,
  get_papers,
  post_paper,
  download_file
}
