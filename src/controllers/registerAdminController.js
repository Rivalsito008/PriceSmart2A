import nodemailer from "nodemailer" //enviar correos
import crypto from "crypto" //Generar codigos aleatorios
import JsonWebToken from "jsonwebtoken" //Generar token
import bcryptjs from "bcryptjs" //Encriptar contraseñas
 
import adminModel from "../models/admins.js"
 
import {config} from "../config.js"
 
const registerAdminController = {};

registerAdminController.registrar = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body
 
        //verificamos si el correo ya esta registrado
        const existAdmin = await adminModel.findOne({email})
        if(existAdmin){
            return res.status(400).json({message: "Admin already exists"})
        }
 
        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)
 
        //Guardamos todo en la base de datos
        const newAdmin = new adminModel({
            name,
            email,
            password: passwordHash,
            isVerified,
            loginAttempts,
            timeOut,
        })
 
        await newAdmin.save();
 
        //Generar codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")
 
        //Guardamos este codigo en un toker
        const tokenCode = JsonWebToken.sign(
            //#1- ¡que vamos a guardar?
            {email, verificationCode},
            //#2- secret key
            config.JWT.secret,
            //#3- ¡cuando expira?
            {expiresIn: "15m"}
        );
 
        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})
 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "para verificar tu cuenta, utiliza este codigo " + verificationCode + " expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error , info) =>{
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "error"})
            }

            res.status(200).json({message: "email send"})
        });
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

registerAdminController.verifyCode = async (req, res) => {
    try {
        const {verificationCode} = req.body;
        const token = req.cookies.verificationTokenCookie
        const decoded = JsonWebToken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode } = decoded;

        if(verificationCode !== storedCode){
            return res.status(400).json({message: "Invalid code"});
        }

        const admin = await adminModel.findOne({email});
        admin.isVerified = true;
        await admin.save();

        res.clearCookie("verificationTokenCookie")
        res.json({message: "Email verified successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

 export default registerAdminController;