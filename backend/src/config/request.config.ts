import { Request } from "express";
import Account from "../entity/account";

export default interface AccountIdRequest extends Request {
  accountId?: number;
  file?: any;
}

export default interface AccountRequest extends Request {
  account?: Account;
}
