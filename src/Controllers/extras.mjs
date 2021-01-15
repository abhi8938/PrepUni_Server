import {
  BMessage,
  Course,
  Legal,
  ValidateBMessage,
  ValidateCourse,
  ValidateLegal,
} from "../Validators/extra.mjs";

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
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
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let bmessage = new BMessage({
    title: req.body.title,
  });

  bmessage = await bmessage.save();

  res.send(bmessage);
};

export const update_bmessage = async (req, res) => {
  //TODO: Complete Request
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

// export const delete_student = (req, res) => {
//TODO Request
// };

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Courses

export const get_courses = async (req, res) => {
  //TODO: Complete Request
  const courses = await Course.find().sort("first_name");
  res.send(courses);
};

export const post_course = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({
    type: req.body.type,
  });

  course = await course.save();

  res.send(course);
};

export const update_course = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
    },
    { new: true }
  );

  if (!course)
    return res
      .status(404)
      .send("The course with the given id is not available");

  res.send(course);
};

// export const delete_student = (req, res) => {
//TODO Request
// };

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Legals
export const get_legals = async (req, res) => {
  //TODO: Complete Request
  const legals = await Package.find().sort("name");
  res.send(legals);
};

export const post_legal = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let legal = new Legal({
    type: req.body.type,
  });

  legal = await legal.save();

  res.send(legal);
};

export const update_legal = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const legal = await Legal.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
    },
    { new: true }
  );

  if (!legal)
    return res.status(404).send("The legal with the given id is not available");

  res.send(legal);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
