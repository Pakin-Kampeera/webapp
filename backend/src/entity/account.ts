import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PasswordLog from "./password";

@Entity({ name: "accounts" })
export default class Account {
  @PrimaryGeneratedColumn()
  accountId: number;

  @Column({ type: "varchar", length: 12, unique: true })
  username: string;

  @Column({ type: "varchar" })
  password: string;

  @OneToMany(() => PasswordLog, (passwordLog) => passwordLog.passwordId)
  passwordLogs: PasswordLog[];
}
