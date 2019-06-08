import { Attempt } from './domain';
import { ConsoleClient } from './emailClients/consoleClient';
import { SendGridClient } from './emailClients/sendGridClient';

const consoleClient = new ConsoleClient();
const sendGridClient = new SendGridClient();

export const clients = [sendGridClient, consoleClient];

export async function makeAttempt(message, attempts) {
  let client = clients[0];

  if (attempts.length) {
    const lastClient = attempts[attempts.length - 1].client;

    client = clients.find(c => c.constructor.name !== lastClient);
  }

  try {
    await client.send(message);

    return new Attempt(message, client.constructor.name);
  } catch (error) {
    return new Attempt(message, client.constructor.name, error);
  }
}
