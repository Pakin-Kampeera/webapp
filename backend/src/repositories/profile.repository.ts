import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/account";
import Profile from "../entity/profile";

@EntityRepository(Profile)
export default class ProfileRepository extends Repository<Profile> {
  public async createProfile(
    firstName: string,
    lastName: string,
    image: Buffer,
    accountId: Account
  ): Promise<Profile> {
    const newProfile = this.create({
      firstName,
      lastName,
      image,
      accountId,
    });
    return await this.save(newProfile);
  }

  public async findAccountAndProfileById(
    accountId: number
  ): Promise<Profile[] | undefined> {
    return await this.find({
      relations: ["accountId"],
      where: { accountId },
    });
  }

  public async updateProfile(
    firstName: string,
    lastName: string,
    imageBuffer: Buffer,
    account: Account
  ) {
    const updateProfile = {
      firstName,
      lastName,
      image: imageBuffer,
    };
    return await this.createQueryBuilder()
      .update(Profile)
      .set(updateProfile)
      .where("accountId = :accountId", account)
      .execute();
  }
}
