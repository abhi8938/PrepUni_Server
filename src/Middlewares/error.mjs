import winston from 'winston';

const error=function (err,req,res,next) {
    winston.log(err.message,err)
    res.status(201).send(err.message);
  }

export default error;