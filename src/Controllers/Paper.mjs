import { Paper, validate, validateUpdate } from "../Validators/Paper.mjs";
import path, { dirname, format } from "path";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const post_paper = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let paper = new Paper(req.body);

  paper = await paper.save();
  res.status(200).send(paper);
};

export const get_papers = async (req, res) => {
  let papers;
  if (req.params.id) {
    papers = await Paper.find({ subject_id: req.params.id });
  } else {
    papers = await Paper.find().sort("name");
  }

  return res.status(200).send(papers);
};

export const get_paper = async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  if (!paper) throw new Error("No papers based based on the Given ID");
  res.status(200).send(paper);
};

export const update_paper = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!paper) throw new Error("There is no paper with given id");

  res.status(200).send(paper);
};

export const download_file = (req, res) => {
  const fileName = req.params.name;
  res.download(`uploads/${fileName}`, (err) => {
    if (err) {
      throw new Error("File can not be downloaded: " + err);
    }
  });
};
