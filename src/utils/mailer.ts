import config from "config";
import nodeMailer, { SendMailOptions } from "nodemailer";
import { smtp } from "../types/smtp";
import { logger } from "./logger";

// async function createTestCreds() {
//   const creds = await nodeMailer.createTestAccount();
//   console.log(creds);
// }

const smtp = config.get<smtp>("smtp");

const transporter = nodeMailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});
async function sendMail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err.message, "Error Sending Mail");
      return;
    }

    logger.info(`Preview URL: ${nodeMailer.getTestMessageUrl(info)}`);
  });
}

export default sendMail;
