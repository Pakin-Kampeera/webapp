import { Request, Response, NextFunction } from "express";
import { Status } from "../config/status.config";
import { getRepository } from "typeorm";
import AccountRequest from "../config/request.config";
import Account from "../entity/account";
import bcrypt from "bcrypt";

export const validateSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  commonValidate(req, res);

  const { username } = req.body as {
    username: string;
  };

  await getRepository(Account)
    .findOne({
      username: username,
    })
    .then((account) => {
      if (account) {
        return res
          .status(Status.BAD_REQUEST)
          .json({ message: "Failed! Username is already in use!" });
      } else {
        next();
      }
    });
};

export const validateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  commonValidate(req, res);
  next();
};

export const validateSignin = async (
  req: AccountRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Username required" });
  }

  if (!password) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Password required" });
  }

  let account;

  try {
    account = await getRepository(Account).findOne({
      username: username,
    });
  } catch (err) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({ message: err });
  }

  if (!account) {
    return res
      .status(Status.UNAUTHORIZED)
      .json({ message: "Invalid credential" });
  }

  const passwordIsValid = bcrypt.compareSync(password, account.password);

  if (!passwordIsValid) {
    return res
      .status(Status.UNAUTHORIZED)
      .json({ message: "Invalid credential" });
  }

  req.account = account;
  next();
};

const commonValidate = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body as {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  const regexUnderScore = /_/;
  const regexCapitalLetter = /[A-Z]/;
  const regexLowerLetter = /[a-z]/;
  const regexLetter = /[A-Za-z]/;
  const regexDigit = /[0-9]/;

  try {
    if (username.length >= 12 || !username) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ message: "Username length should not more than 12" });
    }
  } catch (err) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Username required" });
  }

  try {
    if (password.length <= 6 || !password) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ message: "Password length should greater than 6" });
    }
  } catch (err) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Password required" });
  }

  if (
    !regexCapitalLetter.test(username) ||
    !regexLowerLetter.test(username) ||
    !regexDigit.test(username) ||
    !regexUnderScore.test(username)
  ) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Username must contain A-Z, a-z, 0-9, _" });
  }

  if (!regexLetter.test(password) || !regexDigit.test(password)) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Password must contain letter and number" });
  }

  if (!firstName) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "First name required" });
  }

  if (!lastName) {
    return res
      .status(Status.BAD_REQUEST)
      .json({ message: "Last name required" });
  }
};
