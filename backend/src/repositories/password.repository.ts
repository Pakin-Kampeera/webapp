import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/account";
import PasswordLog from "../entity/password";

@EntityRepository(PasswordLog)
export default class PasswordRepository extends Repository<PasswordLog> {
  public async createPasswordLogs(
    password: string,
    accountId: Account
  ): Promise<PasswordLog> {
    const newPassword = this.create({
      password,
      accountId,
    });
    return await this.save(newPassword);
  }

  public async findLatestPassword(accountId: number): Promise<PasswordLog[]> {
    return await this.find({
      relations: ["accountId"],
      where: { accountId },
      order: { createdAt: "DESC" },
      take: 5,
    });
  }
}
