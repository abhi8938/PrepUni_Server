import {
  Paper_Product,
  validate,
  validateUpdate,
} from "../Validators/paper_product.mjs";
import { generateKeywords, handleUpdate } from "../Services/algo.mjs";

//* req.body = {limit, semester, course, university, subject}
export const get_paper_products = async (req, res) => {
  const paper_products = await Paper_Product.find().sort("name");
  res.send(paper_products);
};

export const get_paper_product = async (req, res) => {
  const paper_product = await Paper_Product.find();
  res.send(paper_product);
};

export const post_paper_products = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let paper_product = new Paper_Product(req.body);
  let keywords = generateKeywords(req.body.name)
    .concat(generateKeywords(req.body.semester))
    .concat(generateKeywords(req.body.course))
    .concat(generateKeywords(req.body.university));
  paper_product.keywords = keywords;
  paper_product = await paper_product.save();

  res.send(paper_product);
};

export const update_paper_products = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const paper_product = await Paper_Product.findByIdAndUpdate(req.params.id);

  if (!paper_product)
    return res
      .status(404)
      .send("The paper_products with the given id is not available");
  handleUpdate(paper_product, req.body);
  paper_product = await paper_product.save();
  res.send(paper_product);
};
