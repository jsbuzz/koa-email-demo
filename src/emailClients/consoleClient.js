import { MessageSenderClient, Attempt } from '../domain';

export class ConsoleClient extends MessageSenderClient {
  async send(message) {
    console.log('ConsoleClient.send', message);

    return new Attempt(message, ConsoleClient);
  }
}
