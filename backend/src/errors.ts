export class InvalidCredentialsError extends Error {
  constructor(message = "Invalid credentials.") {
    super(message);
    this.name = this.constructor.name;
  }
}