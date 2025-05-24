import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendNotification = async (email, payload) => {
    console.log("before email");
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: payload.subject,
        html: payload.body,
    };

    try {
        await transporter.sendMail(mailOptions);
         console.log("before email")
        console.log(`Password Reset OTP sent to ${email}`);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};
