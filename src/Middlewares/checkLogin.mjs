const checkLogin = (req, res, next) => {
  console.log("req checkLogin -", req);
  next();
};
export default checkLogin;
