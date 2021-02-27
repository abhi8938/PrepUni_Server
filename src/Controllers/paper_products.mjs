import {
  Paper_Product,
  validate,
  validateUpdate,
} from "../Validators/paper_product.mjs";
//* req.body = {limit, semester, course, university, subject}
export const get_paper_products = async (req, res) => {
  //TODO: Complete Request
  const paper_products = await Paper_Product.find().sort("name");
  res.send(paper_products);
};

export const get_paper_product = async (req, res) => {
  //TODO: Complete Request
  const paper_products = await Paper_Product.findById(req.params.id);
  res.send(paper_products);
};

export const post_paper_products = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let paper_products = new Paper_Product(req.body);

  paper_products = await paper_products.save();

  res.send(paper_products);
};

export const update_paper_products = async (req, res) => {
  //TODO: Complete Request
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const paper_products = await Paper_Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!paper_products)
    return res
      .status(404)
      .send("The paper_products with the given id is not available");

  res.send(paper_products);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
