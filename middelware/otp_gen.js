const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.GMAIL_APP_PASS);

let Otp = require("../docs");

exports.otp_gen = async (req, res) => {
  try {
    const { gmail } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    Otp[gmail] = {
      code: otp,
      expiry: Date.now() + 5 * 60 * 1000,
    };

    const msg = {
      to: gmail,
      from: {
        email: "aayusharma9711@gmail.com", // must be verified in SendGrid
        name: "Pet App",
      },
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
      html: `<h2>Your OTP is: ${otp}</h2>`,
    };

    await sgMail.send(msg);

    res.send("OTP sent successfully");
  } catch (err) {
    console.error("SENDGRID ERROR:", err.response?.body || err);
    res.status(500).send("Error sending OTP");
  }
};
