import { MessageSenderClient } from '../domain';

export class ConsoleClient extends MessageSenderClient {
  send(message) {
    console.log('ConsoleClient.send', message);
  }
}
