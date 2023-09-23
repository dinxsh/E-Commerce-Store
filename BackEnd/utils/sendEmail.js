const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{
   const transporter =   nodeMailer.createTransport({
       host:process.env.SMTP_HOST,
       port: 465,
       secure: true,
       service:process.env.SERVICE,
        auth:{
            user:process.env.MAIL_ID,
            pass:process.env.PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.MAIL_ID,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:',error);
        // Handle the error here, such as logging it or returning an error response.
    }
};


module.exports = sendEmail