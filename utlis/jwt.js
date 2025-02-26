import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = (payload, expiresIn = "5h") => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, SECRET_KEY);
    } catch (error) {
        console.log(error)
        return null;
    }
};