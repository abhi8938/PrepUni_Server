import winston from "winston";

const error = function (error, req, res, next) {
  winston.log(error.message, error);
  console.log("error", error);
  res.status(500).json({
    message: error.message || "INTERNAL SERVER ERROR",
  });
};

export default error;
