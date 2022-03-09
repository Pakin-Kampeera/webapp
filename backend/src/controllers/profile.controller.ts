import { Status } from "../config/status.config";
import { getCustomRepository } from "typeorm";
import { Response } from "express";
import PasswordRepository from "../repositories/password.repository";
import ProfileRepository from "../repositories/profile.repository";
import AccountRepository from "../repositories/account.repository";
import AccountIdRequest from "../config/request.config";
import bcrypt from "bcrypt";

export const viewProfile = async (req: AccountIdRequest, res: Response) => {
  try {
    await getCustomRepository(ProfileRepository)
      .findAccountAndProfileById(<number>req.accountId)
      .then((data) => {
        if (data && data.length !== 0) {
          return res.status(Status.OK).json({
            data: {
              username: data[0].accountId.username,
              firstName: data[0].firstName,
              lastName: data[0].lastName,
              image: data[0].image,
            },
          });
        } else {
          return res
            .status(Status.BAD_REQUEST)
            .json({ message: "User data not found" });
        }
      });
  } catch (err) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json(err);
  }
};

export const editProfile = async (req: AccountIdRequest, res: Response) => {
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

    const logs = await getCustomRepository(
      PasswordRepository
    ).findLatestPassword(<number>req.accountId);

    for (let i = 0; i < logs.length; i++) {
      if (bcrypt.compareSync(password, logs[i].password)) {
        return res
          .status(Status.BAD_REQUEST)
          .json({ message: "Cannot use 5 latest changed password" });
      }
    }

    const imageBuffer = req.file.buffer;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const account = await getCustomRepository(AccountRepository).updateAccount(
      <number>req.accountId,
      username,
      hashPassword
    );

    if (!account) {
      return res.status(Status.BAD_REQUEST).json({ message: "Update fail" });
    }

    const profile = await getCustomRepository(ProfileRepository).updateProfile(
      firstName,
      lastName,
      imageBuffer,
      account
    );

    if (!profile) {
      return res.status(Status.BAD_REQUEST).json({ message: "Update fail" });
    }

    const passwordLogs = await getCustomRepository(
      PasswordRepository
    ).createPasswordLogs(hashPassword, account);

    if (!passwordLogs) {
      return res.status(Status.BAD_REQUEST).json({ message: "Update fail" });
    }

    return res.status(Status.CREATED).json({ message: "Update success" });
  } catch (err) {
    return res.status(Status.BAD_REQUEST).json({ message: err });
  }
};
