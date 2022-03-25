require("dotenv").config()

const mailTransporter = require("nodemailer").createTransport({
	service: process.env.MAIL_SERVICE,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const app = express();

app.post("*", urlencodedParser, (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
	console.log(request.body);
	const mailDetails = {
		from: process.env.MAIL_USER,
		to: process.env.MAIL_TO,
		subject: eval("`" + process.env.MAIL_SUBJECT + "`"),
		text: eval("`" + process.env.MAIL_BODY + "`")
	};
	mailTransporter.sendMail(mailDetails, (error, _data) => {
		res.status(error ? 500 : 200).send();
	});
	response.end();
});

app.use("*", router);

app.listen(process.env.PORT, () => {
	console.log(`Started on port ${process.env.PORT}`);
})