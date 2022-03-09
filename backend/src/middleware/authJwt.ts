import jwt, { JwtPayload } from "jsonwebtoken";
import { Status } from "../config/status.config";
import { Response, NextFunction } from "express";
import AccountIdRequest from "../config/request.config";

export const verifyToken = (
  req: AccountIdRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  const { authorization } = req.headers as { authorization: string };
  if (authorization && authorization.startsWith("Bearer")) {
    token = <string>authorization.split(" ")[1];
  }
  if (!token || token === null) {
    return res
      .status(Status.UNAUTHORIZED)
      .json({ message: "Not authorized to access this route" });
  }
  jwt.verify(token, <string>process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res
        .status(Status.UNAUTHORIZED)
        .json({ message: "Not authorized to access this route" });
    }
    const accountId = <JwtPayload>decode;
    req.accountId = <number>accountId.id;
    next();
  });
};
