import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = (payload, expiresIn = "5h") => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};