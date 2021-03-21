import {
  BMessage,
  Course,
  Legal,
  University,
  ValidateBMessage,
  ValidateCourse,
  ValidateLegal,
  validateLegalUpdate,
  validateUniversity,
} from "../Validators/extra.mjs";
import {
  generateKeywords,
  handleUpdate,
  sendMail,
  sendSMS,
} from "../Services/algo.mjs";

/*
 * *
 * *
 */

//* BMESSAGE
export const get_bmessage = async (req, res) => {
  const bmessage = await BMessage.find().sort("title");
  res.send(bmessage);
};

export const post_bmessage = async (req, res) => {
  const { error } = ValidateBMessage(req.body);
  if (error) throw new Error(error.details[0].message);

  let bmessage = new BMessage(req.body);

  bmessage = await bmessage.save();

  res.send(bmessage);
};

export const update_bmessage = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const bmessage = await BMessage.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
    },
    { new: true }
  );

  if (!bmessage)
    throw new Error("The bmessage with the given id is not available");

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
  const course = await Course.findById(req.params.id);
  if (!course)
    throw new Error(
      "The course with givern id in not present OR wrong course doc id"
    );
  res.send(course);
};

export const post_course = async (req, res) => {
  const { error } = ValidateCourse(req.body);
  if (error) throw new Error(error.details[0].message);
  let course = new Course(req.body);
  let keywords = generateKeywords(req.body.name).concat(
    generateKeywords(req.body.university)
  );
  course.keywords = keywords;
  try {
    course = await course.save();
  } catch (e) {
    throw new Error(e);
  }
  res.send(course);
};

export const update_course = async (req, res) => {
  if (req.body.cover === undefined || !req.body.syllabus === undefined)
    throw new Error("No request body");
  const course = await Course.findById(req.params.id);
  if (!course) throw new Error("The course with the given id is not available");

  handleUpdate(student, req.body);
  course = await course.save();
  res.status(200).send(course);
};

/*
 * *
 * *
 */

//* Legals
export const get_legal = async (req, res) => {
  const legal = await Legal.findById(req.params.id);
  if (!legal) throw new Error("The legal with the given id is not available");
  res.send(legal);
};

export const post_legal = async (req, res) => {
  const { error } = ValidateLegal(req.body);
  if (error) throw new Error(error.details[0].message);

  let legal = new Legal(req.body);

  legal = await legal.save();

  res.send(legal);
};

export const update_legal = async (req, res) => {
  const { error } = validateLegalUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const legal = await Legal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!legal) throw new Error("The legal with the given id is not available");

  res.send(legal);
};

//* sendMESSAGE/ sendCODE / sendSMS

export const post_code = async (req, res) => {
  if (req.body.recipent === undefined)
    throw new Error("Email Address is undefined");
  if (req.body.code === undefined) throw new Error("Code is undefined");
  if (req.body.method === undefined) throw new Error("method is undefined");

  const subject =
    req.body.type && req.body.type === "RESET"
      ? "PrepUni password reset code"
      : "PrepUni verification code";
  const body =
    req.body.type && req.body.type === "RESET"
      ? `<b>Hello User,<br><br> </b>
               <b>Password reset code for PrepUni app is <h1>${req.body.code}</h1></b>
        `
      : `<b>Hello User,<br><br> </b>
               <b>Verification code for PrepUni app is <h1>${req.body.code}</h1></b>
        `;
  let id = "";
  console.log("request", req.body);
  if (req.body.method === "MAIL") {
    try {
      const info = await sendMail(req.body.recipent, subject, body);
      console.log("Message sent: ", info.response);
      return res.status(200).send({
        id: id.length > 0 ? id : "",
        message: "Mail Sent Successfully",
      });
    } catch (e) {
      throw new Error(e);
    }
  } else {
    try {
      const message =
        req.body.type && req.body.type === "RESET"
          ? `Password reset code for PrepUni app is - ${req.body.code}`
          : `Verification code for PrepUni app is - ${req.body.code}`;

      const sms_response = await sendSMS(req.body.recipent, message);

      console.log("Message sent: ", sms_response);
      return res.status(200).send({
        id: id.length > 0 ? id : "",
        message: "SMS Sent Successfully",
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const post_sms = async (req, res) => {
  if (req.body.recipent === undefined) throw new Error("Contact is undefined");
  if (req.body.message === undefined) throw new Error("Message is undefined");
  try {
    const message = req.body.message;

    const sms_response = await sendSMS(req.body.recipent, message);

    console.log("Message sent: ", sms_response);
    return res.status(200).send({
      id: id.length > 0 ? id : "",
      message: "SMS Sent Successfully",
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const post_mail = async (req, res) => {
  if (req.body.recipent === undefined) throw new Error("Contact is undefined");
  if (req.body.body === undefined) throw new Error("Message is undefined");
  if (req.body.subject === undefined) throw new Error("Subject is undefined");
  try {
    const info = await sendMail(
      req.body.recipent,
      req.body.subject,
      req.body.body
    );
    console.log("Message sent: ", info.response);
    return response.status(200).send({
      id: id.length > 0 ? id : "",
      message: "Mail Sent Successfully",
    });
  } catch (e) {
    throw new Error(e);
  }
};

/*
 * *
 * *
 */

//* University

export const get_universities = async (req, res) => {
  //* req.params = { limit, university , subjects }
  const universities = await University.find().sort("name");
  res.send(universities);
};

export const get_university = async (req, res) => {
  const university = await University.findById(req.params.id);
  if (!university)
    throw new Error(
      "The course with givern id in not present OR wrong course doc id"
    );

  res.send(university);
};

export const post_university = async (req, res) => {
  const { error } = validateUniversity(req.body);
  if (error) throw new Error(error.details[0].message);
  let university = new University(req.body);
  let keywords = generateKeywords(req.body.name);
  university.keywords = keywords;
  try {
    university = await university.save();
    res.send(university);
  } catch (e) {
    throw new Error(e);
  }
};

export const update_university = async (req, res) => {
  if (req.body.logo === undefined) throw new Error("No request body");
  const university = await University.findById(req.params.id);
  if (!university)
    throw new Error("The university with the given id is not available");

  handleUpdate(university, req.body);
  university = await university.save();
  res.status(200).send(university);
};
