import {
  BMessage,
  Course,
  Legal,
  ValidateBMessage,
  ValidateCourse,
  ValidateLegal,
  validateLegalUpdate,
} from "../Validators/extra.mjs";

/*
 * *
 * *
 */

//* BMESSAGE
export const get_bmessage = async (req, res) => {
  //TODO: Complete Request
  const bmessage = await BMessage.find().sort("title");
  res.send(bmessage);
};

export const post_bmessage = async (req, res) => {
  const { error } = ValidateBMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let bmessage = new BMessage({
    title: req.body.title,
  });

  bmessage = await bmessage.save();

  res.send(bmessage);
};

export const update_bmessage = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const bmessage = await BMessage.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
    },
    { new: true }
  );

  if (!bmessage)
    return res
      .status(404)
      .send("The bmessage with the given id is not available");

  res.send(bmessage);
};

/*
 * *
 * *
 */

//* Courses

export const get_courses = async (req, res) => {
  //* req.params = { limit, university , subjects }
  const courses = await Course.find().sort("name");
  res.send(courses);
};

export const get_course = async (req, res) => {
  console.log("req.params", req.params);
  const course = await Course.findById(req.params.id);
  if (!course)
    return res
      .status(404)
      .send("The course with givern id in not present OR wrong course doc id");
  res.send(course);
};

export const post_course = async (req, res) => {
  const { error } = ValidateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let course = new Course(req.body);
  course = await course.save();
  res.send(course);
};

export const update_course = async (req, res) => {
  if (req.body.cover === undefined || !req.body.syllabus === undefined)
    return res.status(400).send("No request body");
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course)
    return res
      .status(404)
      .send("The course with the given id is not available");

  res.status(200).send(course);
};

/*
 * *
 * *
 */

//* Legals
export const get_legal = async (req, res) => {
  const legal = await Package.findById(req.params.id);
  if (!legal)
    return res.status(400).send("The legal with the given id is not available");
  res.send(legal);
};

export const post_legal = async (req, res) => {
  const { error } = ValidateLegal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let legal = new Legal(req.body);

  legal = await legal.save();

  res.send(legal);
};

export const update_legal = async (req, res) => {
  const { error } = validateLegalUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const legal = await Legal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!legal)
    return res.status(404).send("The legal with the given id is not available");

  res.send(legal);
};
