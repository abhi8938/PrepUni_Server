const {encrypt}=require("./ccavutil")
const fs=require("fs")
const http=require("http")
const qs=require("querystring")

const postReq = function (request, response) {
  let body = "",
    workingKey = "7BEFF69AC45060BCF0B398C468762217", //Put in the 32-Bit key shared by CCAvenues.
    accessCode = "AVMD00IA69BQ10DMQB", //Put in the Access Code shared by CCAvenues.
    encRequest = "",
    formbody = "";

  request.on("data", function (data) {
    console.log("data", data);
    body += data;
    encRequest = encrypt(body, workingKey);
    formbody =
      '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
      encRequest +
      '"><input type="hidden" name="access_code" id="access_code" value="' +
      accessCode +
      '"><script language="javascript">document.redirect.submit();</script></form>';
  });

  request.on("end", function () {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(formbody);
    response.end();
  });
  return;
};

module.exports = postReq;
