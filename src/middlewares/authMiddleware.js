import jsonwebtoken from 'jsonwebtoken';
import { config } from "../config.js";

export const validateAuthCokkie = (alloedTypes =[]) => {
    return (req, res, next) => {
        try {
            const { authToken } = req.cookies;
            if (!authToken) {
                return res.status(403).json({ message: 'No cookie found, Authorization' });
            }

            const decoded = jsonwebtoken.verify(authToken, config.jwtSecret);

            if(!alloedTypes.includes(decoded.userType)){
                return res.status(401).json({ message: 'Access denied' });
            }

            next()
        } catch (error) {
            console.log("error" + error);
            return res.status(500).json({ message: 'Invalid token' });
        }
    }
}