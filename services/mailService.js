const nodemailer = require("nodemailer");
const getTransporter = function () {
    let transporter;
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    return transporter;
};

exports.sendRecoveryCodeEmail = async (userEmail, code) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Nuevo codigo de recuperacion generado <roulette-food@gmail.com>",
        to: userEmail,
        subject: "Su código de recuperacion de contraseña",
        text: `Su código de recuperacion es: ${code}`,
        html: `
            <div style="text-align:center;">
              <img src="cid:logo1"/>
              <h1 styles="font-size: 40px;"> Hola, de parte de la plataforma Roulette Food le brindamos su código de recuperación de contraseña:</h1> </div>
              <div style="text-align:center; justify-content: center; margin-top: 20px;"> 
                <h1 style="margin-bottom: 40px; margin-top: 40px; font-size: 80px; font-weight: 700;">${code}</h1>
              </div>
              <div> <h1 styles="font-size: 40px;">Advertencia: Si usted no ha sido informado o no está al tanto de este correo, por favor ignórelo. </h1> </div>
            </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/di4zuv4nk/image/upload/v1657150036/roulette-food/logo/NavbarImg_unvhbd.png",
                cid: "logo1",
            },
        ],
    });
};
