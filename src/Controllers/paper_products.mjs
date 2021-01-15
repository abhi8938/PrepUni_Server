import { Paper_Product, validate } from "../Validators/paper_product.mjs";
export const get_paper_products = async (req, res) => {
  //TODO: Complete Request
  const paper_products = await Paper_Product.find().sort("first_name");
  res.send(paper_products);
};

export const post_paper_products = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let paper_products = new Paper_Product({
    name: req.body.name,
  });

  paper_products = await paper_products.save();

  res.send(paper_products);
};

export const update_paper_products = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const paper_products = await Paper_Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
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
