import { MailtrapClient }  from "mailtrap"
import dotenv from "dotenv"
dotenv.config()

const TOKEN = process.env.MAILTAP_TOKEN
console.log(TOKEN);

export const mailtrap_client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Arowolo sodiq",
};
