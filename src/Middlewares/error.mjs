import winston from "winston";

const error = function (err, req, res, next) {
  winston.log(err.message, err);
  res.status(201).send({ error: err.message });
};

export default error;
