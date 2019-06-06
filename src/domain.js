export class Attempt {
  constructor(message, client, error) {
    this.message = message;
    this.client = client;

    if (error) {
      this.error = error;
      this.success = false;
    } else {
      this.success = true;
    }
  }
}

export class MessageSenderClient {
  send(message) {
    return new Attempt(message);
  }
}
