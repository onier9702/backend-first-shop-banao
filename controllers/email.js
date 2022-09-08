const { response } = require('express');
const nodemailer = require('nodemailer');

const emailController = (req, res = response) => {

    try {

        const { name, lastname, address, mobile } = req.body;
        const cart = req.body.cart;
        let cartString = '';
        cart.forEach( p => {
            cartString = cartString + p.name + '  ';
        } )

        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        const mailOptions = {
            from: 'onier0217@gmail.com', // Sender address
            to: 'rolyzalez95@gmail.com', // List of recipients
            subject: 'Solicitud de compra', // Subject line
            text: `Cliente: ${name} ${lastname}` , // Plain text body
            html: `<h4>Celular: ${mobile} \n <p>Cliente: ${name} ${lastname} </p> \n <p>Carrito: ${cartString}</p> \n Direccion: ${address} </h4>`, // html body
        };
        
        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    ok: false,
                    msg: 'El correo fallo en la transportacion'
                });
            } else {
                console.log(info);
                res.status(200).json({
                    ok: true,
                    info
                });
            };
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ha ocurrido un error, contacte con el Administrador'
        })
    };

};

module.exports = {
    emailController
}