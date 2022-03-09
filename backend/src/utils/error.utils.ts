export class ErrorHandle extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
