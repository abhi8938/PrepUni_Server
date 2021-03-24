import winston from "winston";

const error = function (error, req, res, next) {
  winston.log(err.message, error);
  console.log("error", error);
  res.status(400).send({ error });
};

export default error;
