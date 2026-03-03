import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        msg: "unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("decoded:-", decoded);

    next();
  } catch (error) {
    console.log("error in auth middleware", error);
    return res.status(401).json({
      msg: "unauthorized",
    });
  }
};
