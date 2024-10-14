import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import otpGenerator from "otp-generator";
import connect from "../database/conn.js";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});
let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
    },
});

export const sendOTP = async (req, res) => {
    const { email: userEmail, name: userName } = req.body;

    let otp = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    req.app.locals.OTP = otp;
    const email = {
        body: {
            name: userName,
            intro: `Welcome to MCHeathy! This email sends an OTP for you. Your OTP is: <b>${otp}</b>`,
            outro: "Thank you so much",
        },
    };

    const emailBody = MailGenerator.generate(email);
    const message = {
        from: process.env.NODEMAILER_EMAIL,
        to: userEmail,
        subject: "OTP to register",
        html: emailBody,
    };

    transporter
        .sendMail(message)
        .then(() => {
            return res
                .status(200)
                .send({ msg: "You should receive an email from us." });
        })
        .catch((error) => {
            return res.status(500).send({ error });
        });
};
export async function verifyOTP(req, res) {
    const { otp } = req.params;

    if (parseInt(req.app.locals.OTP) === parseInt(otp)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: "Verify Successsfully!" });
    }
    return res.status(400).send({ error: req.app.locals.OTP });
}
