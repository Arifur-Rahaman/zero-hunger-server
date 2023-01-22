const nodemailer = require('nodemailer')
const sendEmail = async options =>{
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
           user: process.env.EMAIL_USERNAME,
           pass: process.env.EMAIL_PASSWORD
        }
        //Active in gamil "less secure app" option
    });
    
    const mailOptions = {
        from: 'Waste Food Donation',
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;