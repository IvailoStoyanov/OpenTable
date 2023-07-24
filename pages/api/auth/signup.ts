import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    // if you want to have the same url but have different verbs
    if (req.method === "POST") {
        res.status(200).json({
            hello:  "there"
        });
    }
}