export default {
  PORT: 3001,
  LOG_FORMAT: "dev",
  LOG_DIR: "../logs",
  smtp: {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  },
};
