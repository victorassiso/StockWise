const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("Acesso negado");
  }

  //   Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Informe um assunto e uma mensagem");
  }

  const send_to = process.env.EMAIL_USER;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = user.email;
  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "E-mail enviado" });
  } catch (error) {
    res.status(500);
    throw new Error("E-mail não foi enviado, tente novamente");
  }
});

module.exports = {
  contactUs,
};
