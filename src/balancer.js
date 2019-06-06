import { Attempt } from './domain';
import { ConsoleClient } from './emailClients/consoleClient';
import { SendGridClient } from './emailClients/sendGridClient';

const consoleClient = new ConsoleClient();
const sendGridClient = new SendGridClient();

const clients = [sendGridClient, consoleClient];

export async function makeAttempt(message, attempts) {
  let nextTry = 0;
  if (attempts.length) {
    nextTry =
      attempts[attempts.length - 1].client === SendGridClient.name ? 1 : 0;
  }
  const client = clients[nextTry];

  try {
    await clients[nextTry].send(message);

    return new Attempt(message, client.constructor.name);
  } catch (error) {
    return new Attempt(message, client.constructor.name, error);
  }
}
