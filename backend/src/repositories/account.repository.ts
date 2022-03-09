import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/account";

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  public async createAccount(
    username: string,
    password: string
  ): Promise<Account> {
    const newAccount = this.create({
      username,
      password,
    });
    return await this.save(newAccount);
  }

  public async findAccountByUsername(
    username: string
  ): Promise<Account | undefined> {
    return await this.findOne({ username });
  }

  public async updateAccount(
    accountId: number,
    username: string,
    password: string
  ): Promise<Account> {
    const updateAccount = this.create({
      accountId,
      username,
      password,
    });
    return await this.save(updateAccount);
  }
}
