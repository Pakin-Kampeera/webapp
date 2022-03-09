import { Status } from "../config/status.config";
import { getCustomRepository } from "typeorm";
import { Response, Request } from "express";
import AccountRepository from "../repositories/account.repository";
import ProfileRepository from "../repositories/profile.repository";
import AccountRequest from "../config/request.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body as {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  };

  try {
    if (!req.file) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ message: "Image upload required" });
    }

    const imageBuffer = req.file.buffer;

    const account = await getCustomRepository(AccountRepository).createAccount(
      username,
      bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    );

    const profile = await getCustomRepository(ProfileRepository).createProfile(
      firstName,
      lastName,
      imageBuffer,
      account
    );

    if (!profile) {
      return res.status(Status.BAD_REQUEST).json({ message: "Signup fail" });
    }
    return res.status(Status.CREATED).json({ message: "Signup success" });
  } catch (err) {
    return res.status(Status.BAD_REQUEST).json({ message: err });
  }
};

export const signin = async (req: AccountRequest, res: Response) => {
  if (!req.account) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Something went wrong" });
  }
  const accessToken = jwt.sign(
    { id: req.account.accountId },
    <string>process.env.JWT_SECRET
  );
  return res.status(Status.OK).json({ accessToken });
};
