import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // if you want to have the same url but have different verbs (post, get, patch etc)
    if (req.method === "POST") {

        // Authentication
        const { firstName, lastName, email, phone, city, password } = req.body;
        const errors: string[] = []
        const prisma = new PrismaClient();

        const validationSchema = [
            {
                valid: validator.isLength(firstName, {
                    min: 1,
                    max: 20,
                }),
                errorMessage: "First name is invalid"
            },
            {
                valid: validator.isLength(lastName, {
                    min: 1,
                    max: 20,
                }),
                errorMessage: "Last name is invalid"
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is invalid"
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMessage: "Phone number is invalid"
            },
            {
                valid: validator.isLength(city, {
                    min: 1
                }),
                errorMessage: "City is invalid"
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Password is invalid"
            },
        ]

        validationSchema.forEach(check => {
            if (!check.valid) {
                errors.push(check.errorMessage);
            }
        });

        if (errors.length) {
            return res.status(400)
                .json({ errorMessage: errors[0] });
        }

        const userWithEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userWithEmail) {
            return res.status(400)
                .json({ errorMessage: "Email is associated with another account" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                city: city,
                phone: phone,
                email: email,
            }
        })

        // Authorization
        // JWT Header
        const alg = "HS256";

        // JWT Signature
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // Give payload to JOSE to handle authorization
        const token = await new jose.SignJWT({ email: user.email })
            .setProtectedHeader({ alg })
            .setExpirationTime('24h')
            .sign(secret)

        return res.status(200)
            .json({
                token
            });
    }

    return res.status(404).json("Undefined endpoint")
}