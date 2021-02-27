import axios from "axios";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "theprepuni@gmail.com", // generated ethereal user
    pass: "firsematpuchna13.", // generated ethereal password
  },
});

export const generateInvoice = () => {
  return `<h1>Invoice Email Template</h1>`;
};

export const sendMail = async (email, subject, body) => {
  try {
    const info = await transporter.sendMail({
      from: "theprepuni@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject,
      html: body, // html body
    });
    console.log("Message sent: ", info.response);
    return;
  } catch (e) {
    throw new Error(e);
  }
};

export const generateKeywords = (data) => {
  const keywords = [];
  let curName = "";
  data
    .toLowerCase()
    .split("")
    .forEach((alpha) => {
      curName += alpha;
      keywords.push(curName);
    });
  return keywords;
};

export const handleUpdate = (document, body) => {
  return Object.keys(body).map(function (key, index) {
    const DUR = {
      key: key,
      prev: document[key],
      current: body[key],
      created_at: Date.now(),
    };
    document[key] = body[key];
    document.DUR.push(DUR);
  });
};

export const sendNotification = async (Title, Body, id) => {
  const user = await admin.firestore().collection("users").doc(id).get();
  if (!user.exists) return "Invalid Id";
  const userDoc = user.data();
  let payload;

  payload = {
    data: {
      title: Title,
      body: body,
    },
    to: userDoc.device_token,
    direct_book_ok: true,
  };
  return axios
    .post("https://fcm.googleapis.com/fcm/send", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAABunUBK4:APA91bEY93j2nKR30hbOzvnz3uQFFPVtiL4p13exc54kb7vwiIXbTAJyb58EmShSahKx4XO7X1SqDwK4R09Pu0SUzdVCIh8TBUcVfLGnDM7eo-sRfMRXwlqbWqd1P8MP8Ngpk9hxFB8u",
      },
    })
    .then((result) => result)
    .catch((error) => error);
};

export const sendSMS = (contact, message) => {
  return `SMS SENT`;
};
