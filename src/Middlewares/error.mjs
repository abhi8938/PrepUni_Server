import winston from 'winston';

const error=function (err,req,res,next) {
    winston.log(err.message,err)
    res.status(500).send(err.message);
  }

export default error;