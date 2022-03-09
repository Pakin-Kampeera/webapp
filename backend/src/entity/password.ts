import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import Account from "./account";

@Entity("passwordLogs")
export default class PasswordLog {
  @PrimaryGeneratedColumn()
  passwordId: number;

  @Column({ type: "varchar" })
  password: string;

  @ManyToOne(() => Account, (account) => account.accountId)
  @JoinColumn({
    name: "accountId",
  })
  accountId: Account;

  @CreateDateColumn()
  createdAt: Date;
}
