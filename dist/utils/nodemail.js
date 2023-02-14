"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail = (body, emailDest) => {
    let transporter = nodemailer_1.default.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });
    let message = {
        from: "from@test.fr",
        to: emailDest,
        subject: "test nodemailer",
        html: body,
    };
    transporter.verify((err, success) => {
        if (err) {
            console.log(err);
        }
        else {
            transporter.sendMail(message, (error, info) => {
                console.log(info);
            });
        }
    });
};
exports.default = mail;
