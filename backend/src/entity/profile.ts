import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Account from "./account";

@Entity({ name: "profiles" })
export default class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "bytea" })
  image: Buffer;

  @OneToOne(() => Account)
  @JoinColumn({ name: "accountId", referencedColumnName: "accountId" })
  accountId: Account;
}
